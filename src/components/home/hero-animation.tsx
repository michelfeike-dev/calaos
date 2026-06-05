'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1] as const

const item = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
})

export function HeroAnimation() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-5 px-4 pb-10 pt-4 sm:justify-start sm:gap-0 sm:px-8 sm:pb-14 sm:pt-10">

      {/* calma — Mobile: volle Breite · Desktop: links, zurückhaltend */}
      <motion.img
        src="/images/text/calma-fuer-staerke.svg"
        alt="calma für stärke."
        className="w-full sm:ml-[8%] sm:w-[46%] sm:min-w-[280px]"
        draggable={false}
        {...item(0.1)}
      />

      <div className="hidden min-h-0 flex-1 sm:block" />

      {/* chaos — Mobile: volle Breite · Desktop: rechts versetzt */}
      <motion.img
        src="/images/text/chaos-fuer-fluegel.svg"
        alt="chaos für flügel."
        className="w-full sm:ml-[32%] sm:w-[65%] sm:min-w-[360px]"
        draggable={false}
        {...item(0.35)}
      />

      <div className="hidden min-h-0 flex-1 sm:block" />

      {/* lebe dein leben — mittig, Abschluss */}
      <motion.img
        src="/images/text/lebe-dein-leben.svg"
        alt="lebe dein leben."
        className="mx-auto w-full sm:w-[92%] sm:min-w-[500px]"
        draggable={false}
        {...item(0.6)}
      />

      {/* Anker + CTA */}
      <motion.div
        className="mt-0 flex flex-col items-center sm:mt-10"
        {...item(1.2)}
      >
        <Link
          href="/newsletter"
          className="text-center text-base text-white/40 transition-colors duration-150 hover:text-blue-400 sm:text-sm"
        >
          ein leben zwischen calma und chaos.
        </Link>
      </motion.div>

    </div>
  )
}
