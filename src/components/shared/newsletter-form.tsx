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
        setMessage(data.message ?? 'Willkommen. Bis bald.')
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
        Lebe dein Leben. — calaos.
      </p>

      {/* Description */}
      <p className="mb-6 text-sm leading-relaxed text-white/50">
        Ehrliche Gedanken, Abenteuer, Erfahrungen und Werkzeuge für mehr innere Stärke,
        Mut und Lebendigkeit. Lektionen aus Niederlagen, Herausforderungen und Neuanfängen.
        Über das Hinfallen, Aufstehen und Weitertanzen. Ein Leben zwischen Calma und Chaos.
      </p>

      {status === 'success' ? (
        <p className="text-sm text-blue-400">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
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
