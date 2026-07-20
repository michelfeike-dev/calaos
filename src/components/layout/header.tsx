'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalaosLogo } from '@/components/shared/calaos-logo'
import { SourceMenu } from '@/components/layout/source-menu'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2">
      <div className="grid h-14 grid-cols-3 items-center rounded-2xl border border-white/[0.08] bg-[#1c1c1c]/75 px-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl">

        {/* Left — essay + log */}
        <div className="flex items-center gap-5">
          <Link
            href="/essay"
            className={cn(
              'text-sm font-medium tracking-wide transition-colors duration-150',
              pathname === '/essay' || pathname.startsWith('/tag/')
                ? 'text-white'
                : 'text-white/40 hover:text-blue-400'
            )}
          >
            essay
          </Link>
          <Link
            href="/log"
            className={cn(
              'text-sm font-medium tracking-wide transition-colors duration-150',
              pathname === '/log'
                ? 'text-white'
                : 'text-white/40 hover:text-blue-400'
            )}
          >
            log
          </Link>
        </div>

        {/* Center — Logo */}
        <div className="flex items-center justify-center">
          <Link href="/" className="group cursor-pointer">
            <CalaosLogo className="h-8 w-auto" />
          </Link>
        </div>

        {/* Right — source + mentor */}
        <div className="flex items-center justify-end gap-5">
          <SourceMenu />
          <Link
            href="/mentor"
            className={cn(
              'text-sm font-medium tracking-wide transition-colors duration-150',
              pathname === '/mentor'
                ? 'text-white'
                : 'text-white/40 hover:text-blue-400'
            )}
          >
            mentor
          </Link>
        </div>

      </div>
    </header>
  )
}
