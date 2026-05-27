import { NextResponse } from 'next/server'
import { Resend } from 'resend'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const email =
    typeof body === 'object' && body !== null && 'email' in body
      ? String((body as { email: unknown }).email)
      : ''

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    return NextResponse.json({ error: 'Newsletter is not configured yet.' }, { status: 503 })
  }

  const resend = new Resend(apiKey)

  try {
    await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    })

    return NextResponse.json({ message: "You're subscribed. Thank you!" })
  } catch (err) {
    const error = err as { statusCode?: number; message?: string }
    if (error?.statusCode === 409) {
      return NextResponse.json({ message: "You're already subscribed." })
    }
    console.error('[newsletter]', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
