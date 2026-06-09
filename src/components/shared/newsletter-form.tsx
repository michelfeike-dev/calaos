'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

/** Status passed from the page after a confirm/unsubscribe redirect. */
export type InitialStatus = 'confirmed' | 'unsubscribed' | 'invalid'

const INITIAL: Record<InitialStatus, { status: Status; message: string }> = {
  confirmed: { status: 'success', message: 'Deine Anmeldung ist bestätigt. Willkommen.' },
  unsubscribed: { status: 'success', message: 'Du wurdest abgemeldet. Alles Gute.' },
  invalid: { status: 'error', message: 'Der Link ist ungültig oder abgelaufen.' },
}

interface NewsletterFormProps {
  className?: string
  initialStatus?: InitialStatus
}

export function NewsletterForm({ className, initialStatus }: NewsletterFormProps) {
  const seed = initialStatus ? INITIAL[initialStatus] : null
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>(seed?.status ?? 'idle')
  const [message, setMessage] = useState(seed?.message ?? '')
  // Honeypot — must stay empty; bots that auto-fill all fields will trip it.
  const [website, setWebsite] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      const data = (await res.json()) as { message?: string; error?: string }

      if (res.ok) {
        setStatus('success')
        setMessage(data.message ?? 'Fast geschafft — bestätige den Link in deiner E-Mail.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error ?? 'Etwas ist schiefgelaufen. Bitte versuche es erneut.')
      }
    } catch {
      setStatus('error')
      setMessage('Etwas ist schiefgelaufen. Bitte versuche es erneut.')
    }
  }

  return (
    <div className={cn(
      'rounded-2xl border border-white/[0.08] bg-[#1c1c1c] px-8 py-8',
      className
    )}>
      {/* Header */}
      <p className="font-display mb-3 text-2xl font-normal tracking-tight text-white">
        Ein Brief aus calma und chaos.
      </p>

      {/* Description */}
      <p className="mb-6 text-sm leading-relaxed text-white/50">
        Ehrliche Gedanken, Abenteuer und Erfahrungen. Lektionen aus Niederlagen, Herausforderungen und Neuanfängen.
      </p>

      {status === 'success' ? (
        <p className="text-sm text-blue-400">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          {/* Honeypot — visually hidden, never shown to real users */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            hidden
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            required
            disabled={status === 'loading'}
            className={cn(
              'min-w-0 flex-1 rounded-xl border border-white/40 bg-[#252525]',
              'px-4 py-2.5 text-sm text-white placeholder:text-white/20',
              'outline-none ring-0 transition-colors duration-150 focus:border-white/60',
              'disabled:opacity-50'
            )}
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className={cn(
              'shrink-0 rounded-xl bg-blue-400/10 px-5 py-2.5',
              'text-sm font-medium text-blue-400',
              'border border-blue-400/20 transition-all duration-150',
              'hover:bg-blue-400/20 hover:border-blue-400/40',
              'disabled:cursor-not-allowed disabled:opacity-40'
            )}
          >
            {status === 'loading' ? 'Moment…' : 'dabei sein'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-3 text-xs text-red-400/80">{message}</p>
      )}
    </div>
  )
}
