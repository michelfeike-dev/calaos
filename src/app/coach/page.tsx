import type { Metadata } from 'next'
import { PillarsSection } from '@/components/home/pillars-section'

export const metadata: Metadata = {
  title: 'coach',
  description: 'Design coaching — one-on-one sessions for designers who want to level up.',
}

export default function CoachPage() {
  return (
    <>
      <PillarsSection cta={{ href: 'mailto:coach@calaos.me', text: 'komm näher. lass uns sprechen.' }} />
    </>
  )
}
