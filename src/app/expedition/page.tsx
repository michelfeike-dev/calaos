import type { Metadata } from 'next'
import { getAllExpeditions } from '@/lib/expeditions'
import { ExpeditionCard } from '@/components/expeditions/expedition-card'

export const metadata: Metadata = {
  title: 'expedition',
  description: 'Expeditionen zwischen calma und chaos.',
  alternates: { canonical: '/expedition' },
}

export default function ExpeditionPage() {
  const expeditions = getAllExpeditions()

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">

      {/* Subtitle */}
      <p className="mb-12 text-center text-base text-white/40 sm:text-sm">
        raus aus den fesseln. brennen. erden. leben.
      </p>

      {expeditions.length === 0 ? (
        <p className="py-16 text-center text-sm text-white/30">noch keine Expeditionen.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {expeditions.map((expedition) => (
            <ExpeditionCard key={expedition.title} expedition={expedition} />
          ))}
        </div>
      )}

    </div>
  )
}
