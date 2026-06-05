import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import {
  CONFIRM_TOKEN_MAX_AGE_MS,
  HONEYPOT_FIELD,
  __resetRateLimit,
  clientIp,
  confirmUrl,
  isAllowedOrigin,
  isValidEmail,
  normalizeEmail,
  rateLimit,
  signToken,
  unsubscribeUrl,
  verifyToken,
} from './newsletter'

beforeAll(() => {
  process.env.NEWSLETTER_SECRET = 'test-secret-please-change'
  process.env.NEXT_PUBLIC_SITE_URL = 'https://calaos.me'
})

afterEach(() => {
  vi.useRealTimers()
  __resetRateLimit()
})

describe('email', () => {
  it('normalizes (trim + lowercase)', () => {
    expect(normalizeEmail('  Foo@Bar.DE ')).toBe('foo@bar.de')
    expect(normalizeEmail(123)).toBe('')
    expect(normalizeEmail(undefined)).toBe('')
  })

  it('validates format and length', () => {
    expect(isValidEmail('a@b.de')).toBe(true)
    expect(isValidEmail('no-at')).toBe(false)
    expect(isValidEmail('a@b')).toBe(false)
    expect(isValidEmail('a@ b.de')).toBe(false)
    expect(isValidEmail('')).toBe(false)
    expect(isValidEmail(`${'x'.repeat(250)}@b.de`)).toBe(false) // > 254
  })
})

describe('tokens', () => {
  it('round-trips a valid confirm token', () => {
    const token = signToken({ email: 'a@b.de', purpose: 'confirm' })
    expect(verifyToken(token, 'confirm')).toEqual({ email: 'a@b.de' })
  })

  it('rejects a token used for the wrong purpose', () => {
    const token = signToken({ email: 'a@b.de', purpose: 'confirm' })
    expect(verifyToken(token, 'unsubscribe')).toBeNull()
  })

  it('rejects a tampered signature', () => {
    const token = signToken({ email: 'a@b.de', purpose: 'confirm' })
    const tampered = token.slice(0, -1) + (token.endsWith('a') ? 'b' : 'a')
    expect(verifyToken(tampered, 'confirm')).toBeNull()
  })

  it('rejects malformed input', () => {
    expect(verifyToken(null, 'confirm')).toBeNull()
    expect(verifyToken('', 'confirm')).toBeNull()
    expect(verifyToken('no-dot', 'confirm')).toBeNull()
  })

  it('expires confirm tokens after maxAge', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
    const token = signToken({ email: 'a@b.de', purpose: 'confirm' })

    vi.setSystemTime(new Date('2026-01-02T01:00:00Z')) // +25h
    expect(verifyToken(token, 'confirm', { maxAgeMs: CONFIRM_TOKEN_MAX_AGE_MS })).toBeNull()
  })

  it('NEVER expires unsubscribe tokens', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
    const token = signToken({ email: 'a@b.de', purpose: 'unsubscribe' })

    vi.setSystemTime(new Date('2030-01-01T00:00:00Z')) // +4 years
    expect(verifyToken(token, 'unsubscribe')).toEqual({ email: 'a@b.de' })
  })
})

describe('link builders', () => {
  it('confirmUrl embeds a verifiable confirm token', () => {
    const url = new URL(confirmUrl('a@b.de'))
    expect(url.pathname).toBe('/api/newsletter/confirm')
    expect(verifyToken(url.searchParams.get('token'), 'confirm')).toEqual({ email: 'a@b.de' })
  })

  it('unsubscribeUrl embeds a verifiable unsubscribe token', () => {
    const url = new URL(unsubscribeUrl('a@b.de'))
    expect(url.pathname).toBe('/api/newsletter/unsubscribe')
    expect(verifyToken(url.searchParams.get('token'), 'unsubscribe')).toEqual({ email: 'a@b.de' })
  })
})

describe('origin allow-list', () => {
  const make = (origin?: string) =>
    new Request('https://calaos.me/api/newsletter', {
      headers: origin ? { origin } : {},
    })

  it('allows the configured site origin', () => {
    expect(isAllowedOrigin(make('https://calaos.me'))).toBe(true)
  })

  it('allows requests without an Origin header', () => {
    expect(isAllowedOrigin(make())).toBe(true)
  })

  it('blocks foreign origins', () => {
    expect(isAllowedOrigin(make('https://evil.example'))).toBe(false)
  })
})

describe('rate limit', () => {
  it('allows up to the limit then blocks', () => {
    const ip = '1.2.3.4'
    for (let i = 0; i < 5; i++) expect(rateLimit(ip).allowed).toBe(true)
    expect(rateLimit(ip).allowed).toBe(false)
  })

  it('tracks IPs independently', () => {
    for (let i = 0; i < 5; i++) rateLimit('a')
    expect(rateLimit('a').allowed).toBe(false)
    expect(rateLimit('b').allowed).toBe(true)
  })
})

describe('clientIp', () => {
  it('reads the first x-forwarded-for entry', () => {
    const req = new Request('https://calaos.me', {
      headers: { 'x-forwarded-for': '9.9.9.9, 10.0.0.1' },
    })
    expect(clientIp(req)).toBe('9.9.9.9')
  })
})

it('exposes the honeypot field name', () => {
  expect(HONEYPOT_FIELD).toBe('website')
})
