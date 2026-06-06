import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  HONEYPOT_FIELD,
  clientIp,
  confirmUrl,
  confirmationEmailHtml,
  isAllowedOrigin,
  isValidEmail,
  normalizeEmail,
  rateLimit,
} from '@/lib/newsletter'

export const runtime = 'nodejs'

/**
 * Double-opt-in subscription request.
 * Validates, rate-limits and sends a confirmation email. The contact is only
 * created in Resend AFTER the user confirms (see /api/newsletter/confirm).
 */
export async function POST(request: Request) {
  // CSRF: reject cross-site form posts
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  }

  // Best-effort rate limiting
  if (!rateLimit(clientIp(request)).allowed) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte versuche es später erneut.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const record = typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : {}

  // Honeypot: bots fill every field. Respond 200 so they can't probe, but do nothing.
  if (typeof record[HONEYPOT_FIELD] === 'string' && record[HONEYPOT_FIELD] !== '') {
    return NextResponse.json({ message: 'Fast geschafft — bestätige den Link in deiner E-Mail.' })
  }

  const email = normalizeEmail(record.email)
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Bitte gib eine gültige E-Mail-Adresse an.' },
      { status: 400 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  const from = process.env.NEWSLETTER_FROM
  if (!apiKey || !audienceId || !from || !process.env.NEWSLETTER_SECRET) {
    return NextResponse.json({ error: 'Newsletter ist noch nicht konfiguriert.' }, { status: 503 })
  }

  const resend = new Resend(apiKey)

  try {
    // Resend returns { data, error } and does not throw on API errors.
    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: 'Bestätige deine Anmeldung – calaos',
      html: confirmationEmailHtml(confirmUrl(email)),
    })
    if (error) {
      console.error('[newsletter:subscribe]', error)
      return NextResponse.json(
        { error: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ message: 'Fast geschafft — bestätige den Link in deiner E-Mail.' })
  } catch (err) {
    console.error('[newsletter:subscribe]', err)
    return NextResponse.json(
      { error: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.' },
      { status: 500 }
    )
  }
}
