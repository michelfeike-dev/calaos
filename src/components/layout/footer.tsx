'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links: { href: string; label: string; external?: boolean }[] = [
  { href: '/about', label: 'about' },
  { href: '/brief', label: 'brief' },
  { href: 'https://www.instagram.com/calma_and_chaos/', label: 'instagram', external: true },
  { href: '/datenschutz', label: 'datenschutz' },
  { href: '/impressum', label: 'impressum' },
]

export function Footer() {
  const pathname = usePathname()

  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="mx-auto max-w-5xl px-6">

        <div className="flex flex-col items-center gap-6">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3" aria-label="Footer navigation">
            {links.map(({ href, label, external }) =>
              external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/30 transition-colors duration-150 hover:text-blue-400"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'text-xs transition-colors duration-150 hover:text-blue-400',
                    pathname === href ? 'text-white' : 'text-white/30'
                  )}
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} calaos. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
