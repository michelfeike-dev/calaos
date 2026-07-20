import { formatDateShort } from '@/lib/utils'
import type { LogEntry as LogEntryType } from '@/types/log'

interface LogEntryProps {
  entry: LogEntryType
}

/**
 * Logbuch-Eintrag in Geometrie und Typografie der Featured-Post-Karte
 * ([post-card.tsx]) — ohne "Featured"-Label, ohne Lesezeit und ohne Hover,
 * da Einträge nicht verlinkt sind. Datum oben rechts, Ort unten rechts.
 */
export function LogEntry({ entry }: LogEntryProps) {
  return (
    <article
      className={[
        'relative rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-8',
        'border-t-2 border-t-blue-400/30',
      ].join(' ')}
    >
      {/* Date — top right */}
      <time
        dateTime={entry.date}
        className="absolute right-8 top-6 text-xs text-blue-400/60"
      >
        {formatDateShort(entry.date)}
      </time>

      {/* Title */}
      <h2 className="font-display mb-3 pr-28 text-2xl font-normal leading-snug tracking-tight text-white sm:text-3xl">
        {entry.title}
      </h2>

      {/* Text */}
      <p className="mb-6 text-sm leading-relaxed text-white/50">{entry.text}</p>

      {/* Footer — tags left · place right */}
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

        <span className="shrink-0 whitespace-nowrap text-white/30">{entry.ort}</span>
      </div>
    </article>
  )
}
