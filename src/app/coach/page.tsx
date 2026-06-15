import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'coach',
  description: 'Coaching — komm näher. lass uns sprechen.',
  alternates: { canonical: '/coach' },
}

export default function CoachPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <a
        href="mailto:coach@calaos.me"
        className="text-center text-base text-white/40 transition-colors duration-150 hover:text-blue-400 sm:text-sm"
      >
        komm näher. lass uns sprechen.
      </a>
    </div>
  )
}
