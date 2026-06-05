'use client'

import { motion } from 'framer-motion'

const pillars = [
  { src: '/images/text/calma.svg', alt: 'calma.', sub: 'stabilität.' },
  { src: '/images/text/chaos.svg', alt: 'chaos.', sub: 'wachstum durch konfrontation.' },
  { src: '/images/text/leben.svg', alt: 'leben.', sub: 'dein weg.' },
]

const ease = [0.25, 0.1, 0.25, 1] as const

interface PillarsSectionProps {
  cta?: { href: string; text: string }
  border?: boolean
}

export function PillarsSection({ cta, border = false }: PillarsSectionProps) {
  return (
    <section className={border ? 'border-t border-white/[0.06] py-24 sm:py-32' : 'py-24 sm:py-32'}>
      <div className="mx-auto max-w-5xl px-8">
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-3 sm:gap-8">
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
              <p className="text-xs uppercase tracking-widest text-white/25">{sub}</p>
            </motion.div>
          ))}
        </div>

        {cta && (
          <motion.div
            className="mt-16 flex flex-col items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease, delay: 0.6 }}
          >
            <a
              href={cta.href}
              className="text-center text-sm text-white/40 transition-colors duration-150 hover:text-blue-400"
            >
              {cta.text}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
