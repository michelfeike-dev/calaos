import type { Metadata } from 'next'
import Link from 'next/link'
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

      {/* Subtitle — links to the newsletter ("brief") page */}
      <p className="mb-12 text-center">
        <Link
          href="/brief"
          className="text-base text-white/40 transition-colors duration-150 hover:text-blue-400 sm:text-sm"
        >
          gedanken. erfahrungen. lektionen. roh.
        </Link>
      </p>

      <LogBrowser entries={getAllLogEntries()} />

    </div>
  )
}
