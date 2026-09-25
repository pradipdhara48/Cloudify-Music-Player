import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const fileId = searchParams.get('fileId')

  if (!fileId) {
    return NextResponse.json({ error: 'File ID missing' }, { status: 400 })
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXT_PUBLIC_REDIRECT_URI
    )

    const cookieHeader = request.headers.get('cookie') || ''
    const tokenMatch = cookieHeader.match(/drive_token=([^;]+)/)
    const accessToken = tokenMatch ? tokenMatch[1] : null

    if (accessToken) {
      oauth2Client.setCredentials({ access_token: accessToken })
    }

    const drive = google.drive({ version: 'v3', auth: oauth2Client })
    const response = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    )

    return new NextResponse(response.data as any, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Accept-Ranges': 'bytes',
      },
    })
  } catch (error: any) {
    console.error('Streaming error:', error)
    return NextResponse.json({ error: 'Failed to stream audio' }, { status: 500 })
  }
}