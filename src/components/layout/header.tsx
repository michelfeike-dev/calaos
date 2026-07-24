import Link from 'next/link'
import { CalaosLogo } from '@/components/shared/calaos-logo'
import { KompassMenu } from '@/components/layout/kompass-menu'
import { AufbruchMenu } from '@/components/layout/aufbruch-menu'

export function Header() {
  return (
    <header className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2">
      <div className="grid h-14 grid-cols-3 items-center rounded-2xl border border-white/[0.08] bg-[#1c1c1c]/75 px-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl">

        {/* Left — kompass (essay · log · book) */}
        <div className="flex items-center">
          <KompassMenu />
        </div>

        {/* Center — Logo */}
        <div className="flex items-center justify-center">
          <Link href="/" className="group cursor-pointer">
            <CalaosLogo className="h-8 w-auto" />
          </Link>
        </div>

        {/* Right — aufbruch (expedition) */}
        <div className="flex items-center justify-end">
          <AufbruchMenu />
        </div>

      </div>
    </header>
  )
}
