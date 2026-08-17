import Link from 'next/link'
import type { Expedition } from '@/types/expedition'

interface ExpeditionCardProps {
  expedition: Expedition
}

export function ExpeditionCard({ expedition }: ExpeditionCardProps) {
  const href = expedition.url ?? 'mailto:expedition@calaos.me'
  const isHttp = /^https?:/.test(href)
  const isMailto = href.startsWith('mailto:')

  const card = (
    <div
      className={[
        'group flex h-full flex-col rounded-2xl',
        'border border-white/[0.08] border-l-2 border-l-transparent bg-[#1c1c1c]',
        'p-6 transition-all duration-200',
        'hover:border-white/[0.16] hover:border-l-blue-400/50 hover:bg-[#242424]',
      ].join(' ')}
    >
      {/* Title */}
      <h2 className="font-display mb-3 text-2xl font-normal leading-snug tracking-tight text-white transition-colors duration-150 group-hover:text-blue-400 sm:text-3xl">
        {expedition.title}
      </h2>

      {/* Text */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-white/50">{expedition.text}</p>

      {/* Footer — Ort links (statt Lesezeit), Datum rechts (blau) */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/30">{expedition.ort}</span>
        <span className="text-blue-400/60">{expedition.date}</span>
      </div>
    </div>
  )

  return (
    <article className="h-full">
      {isHttp ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
          {card}
        </a>
      ) : isMailto ? (
        <a href={href} className="block h-full">
          {card}
        </a>
      ) : (
        <Link href={href} className="block h-full">
          {card}
        </Link>
      )}
    </article>
  )
}
