import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TagBadgeProps {
  tag: string
  href?: boolean
  className?: string
}

export function TagBadge({ tag, href = true, className }: TagBadgeProps) {
  const base = cn(
    'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium',
    'bg-[var(--bg-subtle)] text-[var(--text-muted)]',
    'border border-[var(--border)] transition-colors duration-150',
    className
  )

  if (!href) return <span className={base}>{tag}</span>

  return (
    <Link
      href={`/tag/${tag}`}
      className={cn(base, 'hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]')}
    >
      {tag}
    </Link>
  )
}
