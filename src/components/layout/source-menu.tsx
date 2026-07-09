'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const items = [{ href: '/buecher', label: 'books' }]

export function SourceMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const active = items.some((i) => pathname.startsWith(i.href))

  // Close on outside click / Escape (for the tap-to-open path on touch devices)
  useEffect(() => {
    if (!open) return
    function onPointer(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'text-sm font-medium tracking-wide transition-colors duration-150',
          active ? 'text-white' : 'text-white/40 hover:text-blue-400'
        )}
      >
        source
      </button>

      {/* Panel — small bridge (pt-3) keeps hover alive between trigger and menu */}
      {open && (
        <div className="absolute left-0 top-full pt-3">
          <ul
            role="menu"
            className="min-w-32 rounded-xl border border-white/[0.08] bg-[#1c1c1c]/95 p-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            {items.map(({ href, label }) => (
              <li key={href} role="none">
                <Link
                  href={href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-lg px-3 py-1.5 text-sm transition-colors duration-150',
                    pathname.startsWith(href)
                      ? 'text-white'
                      : 'text-white/40 hover:bg-white/[0.04] hover:text-blue-400'
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
