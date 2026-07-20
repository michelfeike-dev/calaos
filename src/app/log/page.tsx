import type { Metadata } from 'next'
import { getAllLogEntries } from '@/lib/log'
import { LogEntry } from '@/components/log/log-entry'

export const metadata: Metadata = {
  title: 'log',
  description: 'Logbuch — alltägliche Gedanken und Lektionen zwischen calma und chaos.',
  alternates: { canonical: '/log' },
}

export default function LogPage() {
  const entries = getAllLogEntries()

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {entries.length === 0 ? (
        <p className="py-16 text-center text-sm text-white/30">noch keine Einträge.</p>
      ) : (
        <div className="space-y-8">
          {entries.map((entry) => (
            <LogEntry key={`${entry.date}-${entry.title}`} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}
