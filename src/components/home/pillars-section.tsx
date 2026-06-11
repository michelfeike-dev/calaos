import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface Pillar {
  src: string
  alt: string
  sub: string
}

interface PillarsSectionProps {
  pillars: Pillar[]
  cta?: { href: string; text: string }
  border?: boolean
  /** Use the full viewport width instead of the centered max-w-5xl container */
  wide?: boolean
}

// CSS entrance (tw-animate-css). Runs at first paint — no JS gating — so the
// LCP wordmark becomes visible immediately. Disabled for reduced-motion users
// (content is then shown in its natural, fully visible state).
const enter =
  'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both motion-safe:duration-700'

export function PillarsSection({ pillars, cta, border = false, wide = false }: PillarsSectionProps) {
  const cols =
    pillars.length >= 3 ? 'sm:grid-cols-3' : pillars.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'
  const isExternal = cta ? /^(https?:|mailto:)/.test(cta.href) : false

  const ctaClasses =
    'text-center text-base text-white/40 transition-colors duration-150 hover:text-blue-400 sm:text-sm'

  return (
    <section
      className={
        border
          ? 'border-t border-white/[0.06] pt-2 pb-12 sm:py-32'
          : 'pt-2 pb-12 sm:py-32'
      }
    >
      <div
        className={
          wide
            ? 'mx-auto max-w-none px-6 sm:px-12 lg:px-20'
            : 'mx-auto max-w-5xl px-6 sm:px-8'
        }
      >
        <div className={`grid grid-cols-1 gap-10 ${cols} sm:gap-8`}>
          {pillars.map(({ src, alt, sub }, i) => (
            <div
              key={alt}
              className={cn('flex flex-col items-center gap-4', enter)}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* SVG-Schriftzug — kein next/image nötig (vektoriell, winzig) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} className="w-full" draggable={false} />
              <p className="text-xs uppercase tracking-widest text-blue-400/70">{sub}</p>
            </div>
          ))}
        </div>

        {cta && (
          <div
            className={cn('mt-10 flex flex-col items-center sm:mt-16', enter)}
            style={{ animationDelay: `${pillars.length * 120}ms` }}
          >
            {isExternal ? (
              <a href={cta.href} className={ctaClasses}>
                {cta.text}
              </a>
            ) : (
              <Link href={cta.href} className={ctaClasses}>
                {cta.text}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
