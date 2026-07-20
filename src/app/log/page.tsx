import type { Metadata } from 'next'
import { getAllLogEntries, getAllLogTags } from '@/lib/log'
import { LogBrowser } from '@/components/log/log-browser'

export const metadata: Metadata = {
  title: 'log',
  description: 'Logbuch — alltägliche Gedanken und Lektionen zwischen calma und chaos.',
  alternates: { canonical: '/log' },
}

export default function LogPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <LogBrowser entries={getAllLogEntries()} tags={getAllLogTags()} />
    </div>
  )
}
