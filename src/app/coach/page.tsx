import type { Metadata } from 'next'
import { CoachStatement } from '@/components/home/coach-statement'

export const metadata: Metadata = {
  title: 'coach',
  description: 'Design coaching — one-on-one sessions for designers who want to level up.',
}

export default function CoachPage() {
  return <CoachStatement cta={{ href: 'mailto:coach@calaos.me', text: 'komm näher. lass uns sprechen.' }} />
}
