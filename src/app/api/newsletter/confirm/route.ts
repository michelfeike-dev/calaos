import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { CONFIRM_TOKEN_MAX_AGE_MS, verifyToken } from '@/lib/newsletter'

export const runtime = 'nodejs'

function redirect(request: Request, status: string) {
  return NextResponse.redirect(new URL(`/newsletter?status=${status}`, request.url), 303)
}

/**
 * Double-opt-in confirmation. The contact is created in Resend only here, after
 * the user clicked the signed confirmation link. Re-subscribing a previously
 * unsubscribed contact is handled via upsert.
 */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')
  const verified = verifyToken(token, 'confirm', { maxAgeMs: CONFIRM_TOKEN_MAX_AGE_MS })
  if (!verified) return redirect(request, 'invalid')

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!apiKey || !audienceId) return redirect(request, 'invalid')

  const resend = new Resend(apiKey)

  try {
    // Resend returns { data, error } (no throw). Upsert: create, else re-activate.
    const { error: createError } = await resend.contacts.create({
      email: verified.email,
      audienceId,
      unsubscribed: false,
    })
    if (!createError) return redirect(request, 'confirmed')

    // Already exists (e.g. re-subscribe after a prior unsubscribe) → reactivate
    const { error: updateError } = await resend.contacts.update({
      audienceId,
      email: verified.email,
      unsubscribed: false,
    })
    if (!updateError) return redirect(request, 'confirmed')

    console.error('[newsletter:confirm]', updateError)
    return redirect(request, 'invalid')
  } catch (err) {
    console.error('[newsletter:confirm]', err)
    return redirect(request, 'invalid')
  }
}
