import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12">
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">calaos</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Writings on design, craft, and creative process.
            </p>
          </div>

          <nav className="flex items-center gap-4" aria-label="Footer navigation">
            <Link
              href="/"
              className="text-xs text-[var(--text-muted)] transition-colors duration-150 hover:text-[var(--text-primary)]"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-xs text-[var(--text-muted)] transition-colors duration-150 hover:text-[var(--text-primary)]"
            >
              About
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6">
          <p className="text-xs text-[var(--text-faint)]">
            © {new Date().getFullYear()} calaos. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
