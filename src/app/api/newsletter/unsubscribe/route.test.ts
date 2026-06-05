import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

const { update } = vi.hoisted(() => ({ update: vi.fn() }))
vi.mock('resend', () => ({
  Resend: class {
    contacts = { update, create: vi.fn() }
    emails = { send: vi.fn() }
  },
}))

import { GET } from './route'
import { signToken } from '@/lib/newsletter'

function get(token?: string) {
  const url = token
    ? `https://calaos.me/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`
    : 'https://calaos.me/api/newsletter/unsubscribe'
  return new Request(url)
}

function locationStatus(res: Response): string | null {
  const loc = res.headers.get('location')
  return loc ? new URL(loc).searchParams.get('status') : null
}

beforeAll(() => {
  process.env.NEWSLETTER_SECRET = 'test-secret'
  process.env.NEXT_PUBLIC_SITE_URL = 'https://calaos.me'
  process.env.RESEND_API_KEY = 're_test'
  process.env.RESEND_AUDIENCE_ID = 'aud_test'
})

beforeEach(() => update.mockReset())

describe('GET /api/newsletter/unsubscribe', () => {
  it('marks the contact unsubscribed for a valid token', async () => {
    update.mockResolvedValue({ data: { id: 'c1' }, error: null })
    const res = await GET(get(signToken({ email: 'a@b.de', purpose: 'unsubscribe' })))
    expect(res.status).toBe(303)
    expect(locationStatus(res)).toBe('unsubscribed')
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'a@b.de', unsubscribed: true })
    )
  })

  it('is idempotent when the contact does not exist (not_found)', async () => {
    update.mockResolvedValue({
      data: null,
      error: { name: 'not_found', statusCode: 404, message: 'not found' },
    })
    const res = await GET(get(signToken({ email: 'a@b.de', purpose: 'unsubscribe' })))
    expect(locationStatus(res)).toBe('unsubscribed')
  })

  it('rejects a wrong-purpose token (confirm token cannot unsubscribe)', async () => {
    const res = await GET(get(signToken({ email: 'a@b.de', purpose: 'confirm' })))
    expect(locationStatus(res)).toBe('invalid')
    expect(update).not.toHaveBeenCalled()
  })

  it('rejects a tampered token', async () => {
    const token = signToken({ email: 'a@b.de', purpose: 'unsubscribe' })
    const res = await GET(get(token.slice(0, -2) + 'xy'))
    expect(locationStatus(res)).toBe('invalid')
  })
})
