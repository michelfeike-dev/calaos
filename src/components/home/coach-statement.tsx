'use client'

import { motion } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1] as const

interface CoachStatementProps {
  cta: { href: string; text: string }
}

/**
 * Coach page statement around the "leben" concept.
 * Mobile: the `leben.` pillar word + subtitle "dein weg.".
 * Desktop: the full "lebe dein leben" wordmark (from the landing page).
 */
export function CoachStatement({ cta }: CoachStatementProps) {
  return (
    <section className="py-12 sm:py-32">
      <div className="mx-auto max-w-none px-6 sm:px-12 lg:px-20">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease }}
        >
          {/* Mobile: pillar word + subtitle */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/text/leben.svg"
            alt="leben."
            className="w-full sm:hidden"
            draggable={false}
          />
          <p className="text-xs uppercase tracking-widest text-blue-400/70 sm:hidden">
            dein weg.
          </p>

          {/* Desktop: full wordmark */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/text/lebe-dein-leben.svg"
            alt="lebe dein leben."
            className="hidden w-full sm:block"
            draggable={false}
          />
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col items-center sm:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease, delay: 0.4 }}
        >
          <a
            href={cta.href}
            className="text-center text-base text-white/40 transition-colors duration-150 hover:text-blue-400 sm:text-sm"
          >
            {cta.text}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
