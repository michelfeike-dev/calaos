import type { Metadata } from 'next'
import { getAllLogEntries } from '@/lib/log'
import { LogBrowser } from '@/components/log/log-browser'

export const metadata: Metadata = {
  title: 'log',
  description: 'Logbuch — alltägliche Gedanken und Lektionen zwischen calma und chaos.',
  alternates: { canonical: '/log' },
}

export default function LogPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">

      {/* Subtitle */}
      <p className="mb-12 text-center text-base text-white/40 sm:text-sm">
        gedanken. erfahrungen. lektionen. roh.
      </p>

      <LogBrowser entries={getAllLogEntries()} />

    </div>
  )
}
