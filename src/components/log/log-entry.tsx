import { formatDateShort } from '@/lib/utils'
import type { LogEntry as LogEntryType } from '@/types/log'

interface LogEntryProps {
  entry: LogEntryType
}

/**
 * Logbuch-Eintrag in der Optik der Featured-Post-Karte — ohne "Featured"-Label
 * und ohne Hover-Zustand, da Einträge nicht verlinkt sind.
 */
export function LogEntry({ entry }: LogEntryProps) {
  return (
    <article
      className={[
        'rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-8',
        'border-t-2 border-t-blue-400/30',
      ].join(' ')}
    >
      {/* Entry text */}
      <p className="mb-6 text-sm leading-relaxed text-white/50">{entry.text}</p>

      {/* Footer — tags left · date + place right */}
      <div className="flex items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-white/30"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="shrink-0 whitespace-nowrap text-blue-400/60">
          <time dateTime={entry.date}>{formatDateShort(entry.date)}</time>
          {' · '}
          {entry.ort}
        </span>
      </div>
    </article>
  )
}
