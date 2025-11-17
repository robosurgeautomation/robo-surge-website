import { google } from 'googleapis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name = '', email = '', phone = '', company = '', service = '', message = '' } = body || {};

    const creds = process.env.GOOGLE_CREDENTIALS_JSON;
    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!creds || !spreadsheetId) {
      return res.status(500).json({ success: false, error: 'Server not configured' });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(creds),
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

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('submit-demo error:', err?.message || err);
    return res.status(500).json({ success: false, error: err?.message || 'Unknown error' });
  }
}
