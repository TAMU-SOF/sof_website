// src/app/api/sheet/route.js
import { readFileSync } from 'fs'
import { join } from 'path'
import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function GET() {
  // 1) Load the JSON credentials from disk
  const keyPath = join(process.cwd(), 'credentials', 'google-sa.json')
  let creds
  try {
    creds = JSON.parse(readFileSync(keyPath, 'utf8'))
  } catch (err) {
    console.error('Failed to read service-account file:', err)
    return NextResponse.json({ error: 'Service account credentials missing' }, { status: 500 })
  }

  // 2) Build the Sheets client
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })
    const client = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: client })

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Amit D. Investor Relations!B2:I3',
    })

    const rows = res.data.values ?? []
    // Option B: destructure into header and data rows
    const [header = [], data = []] = rows

    // Return both header and data as an object
    return NextResponse.json({ header, data })
  } catch (err) {
    console.error('/api/sheet error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
