import { LogEntry } from './log-entry'
import type { LogEntry as LogEntryType } from '@/types/log'

interface LogBrowserProps {
  entries: LogEntryType[]
}

export function LogBrowser({ entries }: LogBrowserProps) {
  if (entries.length === 0) {
    return <p className="py-16 text-center text-sm text-white/30">noch keine Einträge.</p>
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <LogEntry key={`${entry.date}-${entry.title}`} entry={entry} />
      ))}
    </div>
  )
}
