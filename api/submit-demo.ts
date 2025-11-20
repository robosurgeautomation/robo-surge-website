import { google } from 'googleapis';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name = '', email = '', phone = '', company = '', service = '', message = '' } = body || {};

    const spreadsheetId = process.env.SPREADSHEET_ID;

    // Accept either raw JSON in GOOGLE_CREDENTIALS_JSON or base64 in GOOGLE_CREDENTIALS_B64
    const credsJson = process.env.GOOGLE_CREDENTIALS_JSON;
    const credsB64 = process.env.GOOGLE_CREDENTIALS_B64;

    console.log('ENV check - SPREADSHEET_ID:', !!spreadsheetId, 'GOOGLE_CREDENTIALS_JSON:', !!credsJson, 'GOOGLE_CREDENTIALS_B64:', !!credsB64);

    if (!spreadsheetId || (!credsJson && !credsB64)) {
      console.error('Missing config: SPREADSHEET_ID or GOOGLE_CREDENTIALS not set');
      return res.status(500).json({ success: false, error: 'Server not configured - missing env vars' });
    }

    let credentials: any;
    try {
      if (credsJson) {
        credentials = JSON.parse(credsJson);
      } else {
        // decode base64
        const decoded = Buffer.from(credsB64 as string, 'base64').toString('utf8');
        credentials = JSON.parse(decoded);
      }
    } catch (parseErr) {
      console.error('Failed to parse Google credentials:', parseErr);
      return res.status(500).json({ success: false, error: 'Invalid credentials format' });
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const values = [[new Date().toISOString(), name, email, phone, company, service, message]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    console.log('Row appended successfully');
    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('submit-demo error:', err?.message || err);
    return res.status(500).json({ success: false, error: err?.message || 'Unknown error', details: err?.toString() });
  }
}
