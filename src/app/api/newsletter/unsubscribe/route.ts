import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { verifyToken } from '@/lib/newsletter'

export const runtime = 'nodejs'

function redirect(request: Request, status: string) {
  return NextResponse.redirect(new URL(`/newsletter?status=${status}`, request.url), 303)
}

/**
 * Branded self-service unsubscribe. Tokens NEVER expire — a user must be able to
 * opt out from an old newsletter at any time (DSGVO Art. 7(3)). Idempotent.
 */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')
  const verified = verifyToken(token, 'unsubscribe') // no maxAge → never expires
  if (!verified) return redirect(request, 'invalid')

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!apiKey || !audienceId) return redirect(request, 'invalid')

  const resend = new Resend(apiKey)

  try {
    // Resend returns { data, error } (no throw).
    const { error } = await resend.contacts.update({
      audienceId,
      email: verified.email,
      unsubscribed: true,
    })
    if (!error) return redirect(request, 'unsubscribed')

    // Not in the audience → nothing to unsubscribe; treat as success (idempotent)
    if (error.name === 'not_found') return redirect(request, 'unsubscribed')

    console.error('[newsletter:unsubscribe]', error)
    return redirect(request, 'invalid')
  } catch (err) {
    console.error('[newsletter:unsubscribe]', err)
    return redirect(request, 'invalid')
  }
}
