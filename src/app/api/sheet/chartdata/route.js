import { readFileSync } from 'fs'
import { join } from 'path'
import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function GET() {
  const keyPath = join(process.cwd(), 'credentials', 'google-sa.json')
  let creds
  try {
    creds = JSON.parse(readFileSync(keyPath, 'utf8'))
  } catch (err) {
    console.error('Failed to read service-account file:', err)
    return NextResponse.json({ error: 'Service account credentials missing' }, { status: 500 })
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })
    const client = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: client })

    // This is where your historical data lives (update range if needed)
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Investor Relations Master Sheet!B8:D299',   // <-- UPDATE THIS SHEET NAME & RANGE IF NEEDED
    })

    const rows = res.data.values ?? []

    return NextResponse.json({ rows })
  } catch (err) {
    console.error('/api/chartdata error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
