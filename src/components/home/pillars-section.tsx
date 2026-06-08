'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

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

const ease = [0.25, 0.1, 0.25, 1] as const

export function PillarsSection({ pillars, cta, border = false, wide = false }: PillarsSectionProps) {
  const cols =
    pillars.length >= 3 ? 'sm:grid-cols-3' : pillars.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'
  const isExternal = cta ? /^(https?:|mailto:)/.test(cta.href) : false

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
            <motion.div
              key={alt}
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease, delay: i * 0.2 }}
            >
              {/* SVG-Schriftzug — kein next/image nötig (vektoriell, winzig) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} className="w-full" draggable={false} />
              <p className="text-xs uppercase tracking-widest text-blue-400/70">{sub}</p>
            </motion.div>
          ))}
        </div>

        {cta && (
          <motion.div
            className="mt-10 flex flex-col items-center sm:mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease, delay: 0.6 }}
          >
            {isExternal ? (
              <a
                href={cta.href}
                className="text-center text-base text-white/40 transition-colors duration-150 hover:text-blue-400 sm:text-sm"
              >
                {cta.text}
              </a>
            ) : (
              <Link
                href={cta.href}
                className="text-center text-base text-white/40 transition-colors duration-150 hover:text-blue-400 sm:text-sm"
              >
                {cta.text}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
