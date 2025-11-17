import express from "express";
import cors from "cors";
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

// Google Sheets Configuration
const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");
const SPREADSHEET_ID = process.env.SPREADSHEET_ID || "YOUR_SPREADSHEET_ID";

// Verify credentials file exists
if (!fs.existsSync(CREDENTIALS_PATH)) {
  console.warn("⚠️  credentials.json not found. Please add it to the project root.");
  console.warn("Follow the setup guide to get credentials from Google Cloud Console.");
}

async function authorize() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return auth.getClient();
  } catch (error) {
    console.error("Authorization error:", error);
    throw new Error("Failed to authorize with Google Sheets API");
  }
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running", timestamp: new Date().toISOString() });
});

// Submit demo form data to Google Sheet
app.post("/api/submit-demo", async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required",
      });
    }

    const auth = await authorize();
    const sheets = google.sheets({ version: "v4", auth });

    // Append data to Google Sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
        range: "Sheet1!A:G",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            new Date().toISOString(),
            name,
            email,
            phone || "N/A",
            company || "N/A",
            service || "N/A",
            message,
          ],
        ],
      },
    });

    console.log("✅ Data appended to Google Sheet:", response.data);

    res.json({
      success: true,
      message: "Demo request submitted successfully!",
      rowsAdded: response.data.updates.updatedRows,
    });
  } catch (error) {
    console.error("❌ Error submitting demo:", error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to submit demo request",
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Demo form endpoint: POST http://localhost:${PORT}/api/submit-demo`);
});
