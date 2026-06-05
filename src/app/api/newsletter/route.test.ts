import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

const { send } = vi.hoisted(() => ({ send: vi.fn() }))
vi.mock('resend', () => ({
  Resend: class {
    emails = { send }
    contacts = { create: vi.fn(), update: vi.fn() }
  },
}))

import { POST } from './route'
import { __resetRateLimit, HONEYPOT_FIELD } from '@/lib/newsletter'

function post(body: unknown, headers: Record<string, string> = {}) {
  return new Request('https://calaos.me/api/newsletter', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}

beforeAll(() => {
  process.env.NEWSLETTER_SECRET = 'test-secret'
  process.env.NEXT_PUBLIC_SITE_URL = 'https://calaos.me'
  process.env.RESEND_API_KEY = 're_test'
  process.env.RESEND_AUDIENCE_ID = 'aud_test'
  process.env.NEWSLETTER_FROM = 'calaos <newsletter@calaos.me>'
})

beforeEach(() => {
  __resetRateLimit()
  send.mockReset()
  send.mockResolvedValue({ data: { id: 'email_1' }, error: null })
})
afterEach(() => vi.restoreAllMocks())

describe('POST /api/newsletter', () => {
  it('blocks foreign origins (CSRF)', async () => {
    const res = await POST(post({ email: 'a@b.de' }, { origin: 'https://evil.example' }))
    expect(res.status).toBe(403)
    expect(send).not.toHaveBeenCalled()
  })

  it('rejects invalid JSON', async () => {
    const res = await POST(post('{not json', {}))
    expect(res.status).toBe(400)
  })

  it('rejects an invalid email', async () => {
    const res = await POST(post({ email: 'nope' }))
    expect(res.status).toBe(400)
    expect(send).not.toHaveBeenCalled()
  })

  it('silently accepts but ignores honeypot hits', async () => {
    const res = await POST(post({ email: 'a@b.de', [HONEYPOT_FIELD]: 'bot' }))
    expect(res.status).toBe(200)
    expect(send).not.toHaveBeenCalled()
  })

  it('sends a confirmation email on success (no contact created yet)', async () => {
    const res = await POST(post({ email: 'New@Person.de', website: '' }))
    expect(res.status).toBe(200)
    expect(send).toHaveBeenCalledTimes(1)
    const arg = send.mock.calls[0][0]
    expect(arg.to).toBe('new@person.de') // normalized
    expect(arg.html).toContain('/api/newsletter/confirm?token=')
  })

  it('rate-limits after too many requests', async () => {
    for (let i = 0; i < 5; i++) {
      await POST(post({ email: 'a@b.de' }, { 'x-forwarded-for': '5.5.5.5' }))
    }
    const res = await POST(post({ email: 'a@b.de' }, { 'x-forwarded-for': '5.5.5.5' }))
    expect(res.status).toBe(429)
  })

  it('returns 503 when not configured', async () => {
    const prev = process.env.RESEND_API_KEY
    delete process.env.RESEND_API_KEY
    const res = await POST(post({ email: 'a@b.de' }))
    expect(res.status).toBe(503)
    process.env.RESEND_API_KEY = prev
  })
})
