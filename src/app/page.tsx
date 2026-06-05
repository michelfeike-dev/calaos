import type { Metadata } from 'next'
import { HeroAnimation } from '@/components/home/hero-animation'

export const metadata: Metadata = {
  title: { absolute: 'calaos.' },
  description: 'calma für stärke. chaos für flügel. lebe dein leben.',
}

export default function HomePage() {
  return <HeroAnimation />
}
