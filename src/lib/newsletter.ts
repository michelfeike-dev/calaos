import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Stateless newsletter helpers.
 *
 * Architecture rule: Resend is the ONLY system of record for subscriptions,
 * double-opt-in status and unsubscribes. This module holds no state beyond a
 * best-effort in-memory rate limiter; all subscription state lives in Resend.
 */

/** Bumped when the consent wording materially changes. Carried inside tokens. */
export const CONSENT_VERSION = 1

/** Hidden form field name used to trap naive bots. */
export const HONEYPOT_FIELD = 'website'

const CONFIRM_MAX_AGE_MS = 24 * 60 * 60 * 1000 // 24h — opt-in confirmation only

export type TokenPurpose = 'confirm' | 'unsubscribe'

interface TokenPayload {
  email: string
  ts: number
  v: number
  purpose: TokenPurpose
}

// ─── Email ────────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(value: unknown): string {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

export function isValidEmail(email: string): boolean {
  return email.length > 0 && email.length <= 254 && EMAIL_RE.test(email)
}

// ─── HMAC tokens ────────────────────────────────────────────────────────────────

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64url')
}

function getSecret(): string {
  const secret = process.env.NEWSLETTER_SECRET
  if (!secret) throw new Error('NEWSLETTER_SECRET is not configured')
  return secret
}

function sign(payloadB64: string): string {
  return createHmac('sha256', getSecret()).update(payloadB64).digest('base64url')
}

/** Creates a tamper-proof token. `purpose` binds it to a single use. */
export function signToken(input: { email: string; purpose: TokenPurpose }): string {
  const payload: TokenPayload = {
    email: input.email,
    ts: Date.now(),
    v: CONSENT_VERSION,
    purpose: input.purpose,
  }
  const payloadB64 = base64url(JSON.stringify(payload))
  return `${payloadB64}.${sign(payloadB64)}`
}

/**
 * Verifies a token and returns the contained email, or null if invalid.
 * Confirm tokens expire (maxAgeMs); unsubscribe tokens NEVER expire — a user
 * must be able to unsubscribe from an old newsletter years later.
 */
export function verifyToken(
  token: string | null | undefined,
  purpose: TokenPurpose,
  opts: { maxAgeMs?: number } = {}
): { email: string } | null {
  if (!token || typeof token !== 'string') return null

  const dot = token.indexOf('.')
  if (dot <= 0) return null

  const payloadB64 = token.slice(0, dot)
  const sigB64 = token.slice(dot + 1)

  // Constant-time signature comparison
  const expected = Buffer.from(sign(payloadB64))
  const actual = Buffer.from(sigB64)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null
  }

  let payload: TokenPayload
  try {
    payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'))
  } catch {
    return null
  }

  if (payload.purpose !== purpose) return null
  if (!payload.email || typeof payload.ts !== 'number') return null

  if (opts.maxAgeMs !== undefined && Date.now() - payload.ts > opts.maxAgeMs) {
    return null
  }

  return { email: payload.email }
}

export const CONFIRM_TOKEN_MAX_AGE_MS = CONFIRM_MAX_AGE_MS

// ─── Link builders ──────────────────────────────────────────────────────────────

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://calaos.me'
}

export function confirmUrl(email: string): string {
  const token = signToken({ email, purpose: 'confirm' })
  return `${siteUrl()}/api/newsletter/confirm?token=${encodeURIComponent(token)}`
}

/** Build a branded, non-expiring unsubscribe link for newsletter footers. */
export function unsubscribeUrl(email: string): string {
  const token = signToken({ email, purpose: 'unsubscribe' })
  return `${siteUrl()}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`
}

// ─── CSRF: origin allow-list ────────────────────────────────────────────────────

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  // Non-browser / same-origin server calls may omit Origin entirely.
  if (!origin) return true

  const allowed = new Set<string>([siteUrl()])
  if (process.env.NODE_ENV !== 'production') {
    allowed.add('http://localhost:3000')
    allowed.add('http://127.0.0.1:3000')
  }
  return allowed.has(origin)
}

// ─── Best-effort in-memory rate limiter ─────────────────────────────────────────
// NOTE: per serverless instance, resets on cold start. Durable limiting would
// require a KV store, which the project deliberately avoids (no persistence).

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const hits = new Map<string, number[]>()

export function rateLimit(ip: string, now: number = Date.now()): { allowed: boolean } {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent)
    return { allowed: false }
  }
  recent.push(now)
  hits.set(ip, recent)
  return { allowed: true }
}

/** Test helper — clears the rate-limit window. */
export function __resetRateLimit(): void {
  hits.clear()
}

export function clientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]!.trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

// ─── Confirmation email ─────────────────────────────────────────────────────────

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function confirmationEmailHtml(link: string): string {
  const safeLink = escapeHtml(link)
  return `<!doctype html>
<html lang="de">
  <body style="margin:0;background:#141414;color:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:480px;margin:0 auto;padding:40px 24px;">
      <p style="font-size:20px;margin:0 0 16px;">Lebe dein Leben. — calaos.</p>
      <p style="color:rgba(255,255,255,0.6);line-height:1.6;margin:0 0 24px;">
        Fast geschafft. Bestätige deine Anmeldung zum Newsletter mit einem Klick:
      </p>
      <p style="margin:0 0 24px;">
        <a href="${safeLink}" style="display:inline-block;background:rgba(96,165,250,0.15);color:#60a5fa;border:1px solid rgba(96,165,250,0.3);border-radius:12px;padding:12px 20px;text-decoration:none;">
          Anmeldung bestätigen
        </a>
      </p>
      <p style="color:rgba(255,255,255,0.3);font-size:12px;line-height:1.6;margin:0;">
        Wenn du dich nicht angemeldet hast, ignoriere diese E-Mail einfach —
        ohne Bestätigung passiert nichts. Der Link ist 24 Stunden gültig.
      </p>
    </div>
  </body>
</html>`
}
