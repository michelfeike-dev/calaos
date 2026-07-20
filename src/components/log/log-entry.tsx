import { formatDateShort } from '@/lib/utils'
import type { LogEntry as LogEntryType } from '@/types/log'

interface LogEntryProps {
  entry: LogEntryType
}

/**
 * Logbuch-Eintrag in Geometrie und Typografie der Featured-Post-Karte
 * ([post-card.tsx]) — ohne "Featured"-Label und ohne Hover, da Einträge nicht
 * verlinkt sind. Fuß spiegelt den Essay-Eintrag: links Ort (wie Lesezeit),
 * rechts Datum.
 */
export function LogEntry({ entry }: LogEntryProps) {
  return (
    <article
      className={[
        'relative rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-8',
        'border-t-2 border-t-blue-400/30',
      ].join(' ')}
    >
      {/* Title */}
      <h2 className="font-display mb-3 text-2xl font-normal leading-snug tracking-tight text-white sm:text-3xl">
        {entry.title}
      </h2>

      {/* Text */}
      <p className="mb-6 text-sm leading-relaxed text-white/50">{entry.text}</p>

      {/* Footer — place left · date right (mirrors the essay card) */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/30">{entry.ort}</span>
        <time className="text-blue-400/60" dateTime={entry.date}>
          {formatDateShort(entry.date)}
        </time>
      </div>
    </article>
  )
}
