'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json() as { message?: string; error?: string }

      if (res.ok) {
        setStatus('success')
        setMessage(data.message ?? 'You\'re subscribed. Thank you.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className={cn('rounded-lg border border-[var(--border)] p-6', className)}>
      <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Stay in the loop</p>
      <p className="mb-4 text-sm text-[var(--text-muted)]">
        New writings on design and craft, straight to your inbox. No noise.
      </p>

      {status === 'success' ? (
        <p className="text-sm text-[var(--accent-vivid)]">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={status === 'loading'}
            className={cn(
              'min-w-0 flex-1 rounded-md border border-[var(--border)] bg-[var(--bg-elevated)]',
              'px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)]',
              'transition-colors duration-150 focus:border-[var(--accent-vivid)] focus:outline-none',
              'disabled:opacity-50'
            )}
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className={cn(
              'shrink-0 rounded-md bg-[var(--text-primary)] px-4 py-2',
              'text-sm font-medium text-[var(--bg-base)]',
              'transition-opacity duration-150 hover:opacity-80',
              'disabled:cursor-not-allowed disabled:opacity-40'
            )}
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-2 text-xs text-red-500">{message}</p>
      )}
    </div>
  )
}
