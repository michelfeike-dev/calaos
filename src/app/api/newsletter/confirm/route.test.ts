import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

const { create, update } = vi.hoisted(() => ({ create: vi.fn(), update: vi.fn() }))
vi.mock('resend', () => ({
  Resend: class {
    contacts = { create, update }
    emails = { send: vi.fn() }
  },
}))

import { GET } from './route'
import { signToken } from '@/lib/newsletter'

function get(token?: string) {
  const url = token
    ? `https://calaos.me/api/newsletter/confirm?token=${encodeURIComponent(token)}`
    : 'https://calaos.me/api/newsletter/confirm'
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

beforeEach(() => {
  create.mockReset()
  update.mockReset()
})

describe('GET /api/newsletter/confirm', () => {
  it('creates the contact for a valid token and redirects confirmed', async () => {
    create.mockResolvedValue({ data: { id: 'c1' }, error: null })
    const res = await GET(get(signToken({ email: 'a@b.de', purpose: 'confirm' })))
    expect(res.status).toBe(303)
    expect(locationStatus(res)).toBe('confirmed')
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'a@b.de', unsubscribed: false })
    )
  })

  it('re-activates an existing (unsubscribed) contact when create errors', async () => {
    create.mockResolvedValue({
      data: null,
      error: { name: 'validation_error', statusCode: 422, message: 'exists' },
    })
    update.mockResolvedValue({ data: { id: 'c1' }, error: null })
    const res = await GET(get(signToken({ email: 'a@b.de', purpose: 'confirm' })))
    expect(locationStatus(res)).toBe('confirmed')
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'a@b.de', unsubscribed: false })
    )
  })

  it('rejects a wrong-purpose token', async () => {
    const res = await GET(get(signToken({ email: 'a@b.de', purpose: 'unsubscribe' })))
    expect(locationStatus(res)).toBe('invalid')
    expect(create).not.toHaveBeenCalled()
  })

  it('rejects a missing token', async () => {
    const res = await GET(get())
    expect(locationStatus(res)).toBe('invalid')
  })
})
