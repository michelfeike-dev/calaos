import type { Metadata } from 'next'
import { PillarsSection } from '@/components/home/pillars-section'

export const metadata: Metadata = {
  title: { absolute: 'calaos.' },
  description: 'calma für innere stärke. chaos für flügel. leben — dein weg.',
}

const pillars = [
  { src: '/images/text/calma.svg', alt: 'calma.', sub: 'innere stärke.' },
  { src: '/images/text/chaos.svg', alt: 'chaos.', sub: 'flügel.' },
  { src: '/images/text/leben.svg', alt: 'leben.', sub: 'dein weg.' },
]

export default function HomePage() {
  return (
    <PillarsSection
      wide
      pillars={pillars}
      cta={{ href: '/newsletter', text: 'wachstum zwischen calma und chaos.' }}
    />
  )
}
