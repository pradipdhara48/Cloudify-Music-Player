import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXT_PUBLIC_REDIRECT_URI
    )

    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    const drive = google.drive({ version: 'v3', auth: oauth2Client })
    const res = await drive.files.list({
      q: "mimeType contains 'audio/' and trashed = false",
      fields: 'files(id, name, mimeType, size)',
      pageSize: 50,
    })

    const response = NextResponse.json({ files: res.data.files })

    if (tokens.access_token) {
      response.cookies.set('drive_token', tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600,
      })
    }

    return response
  } catch (error: any) {
    console.error('Error fetching drive files:', error)
    return NextResponse.json({ error: error.message || 'Failed' }, { status: 500 })
  }
}