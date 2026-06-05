'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/about', label: 'über mich' },
  { href: '/datenschutz', label: 'datenschutz' },
  { href: '/impressum', label: 'impressum' },
  { href: '/newsletter', label: 'brief' },
]

export function Footer() {
  const pathname = usePathname()

  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="mx-auto max-w-5xl px-6">

        <div className="flex flex-col items-center gap-6">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3" aria-label="Footer navigation">
            {links.map(({ href, label }) => (
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
            ))}
          </nav>

          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} calaos. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
