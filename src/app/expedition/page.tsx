import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'expedition',
  description: 'Expedition — komm näher. lass uns sprechen.',
  alternates: { canonical: '/expedition' },
}

export default function ExpeditionPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <a
        href="mailto:expedition@calaos.me"
        className="text-center text-base text-white/40 transition-colors duration-150 hover:text-blue-400 sm:text-sm"
      >
        komm näher. lass uns sprechen.
      </a>
    </div>
  )
}
