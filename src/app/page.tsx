import type { Metadata } from 'next'
import { PillarsSection } from '@/components/home/pillars-section'

export const metadata: Metadata = {
  title: { absolute: 'calaos.' },
  description: 'calma ist erde. chaos ist feuer. leben in freiheit.',
  alternates: { canonical: '/' },
}

const pillars = [
  { src: '/images/text/calma.svg', alt: 'calma.', sub: 'erde.' },
  { src: '/images/text/chaos.svg', alt: 'chaos.', sub: 'feuer.' },
  { src: '/images/text/leben.svg', alt: 'leben.', sub: 'freiheit.' },
]

export default function HomePage() {
  return (
    <PillarsSection
      wide
      pillars={pillars}
      cta={{ href: '/newsletter', text: 'zwischen erde und feuer entsteht freiheit.' }}
    />
  )
}
