'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const items = [{ href: '/expedition', label: 'expedition' }]

function isActive(href: string, pathname: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function HamburgerMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const active = items.some((i) => isActive(i.href, pathname))

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
      className="relative flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Menü"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center transition-colors duration-150',
          active || open ? 'text-white' : 'text-white/40 hover:text-blue-400'
        )}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="3.5" y1="7" x2="20.5" y2="7" />
          <line x1="3.5" y1="12" x2="20.5" y2="12" />
          <line x1="3.5" y1="17" x2="20.5" y2="17" />
        </svg>
      </button>

      {/* Panel — small bridge (pt-3) keeps hover alive between trigger and menu */}
      {open && (
        <div className="absolute right-0 top-full pt-3">
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
                    isActive(href, pathname)
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
