'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface TagFilterProps {
  tags: string[]
  activeTag?: string
}

export function TagFilter({ tags, activeTag }: TagFilterProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={cn(
          'rounded px-3 py-1 text-xs font-medium transition-colors duration-150',
          pathname === '/' && !activeTag
            ? 'bg-[var(--text-primary)] text-[var(--bg-base)]'
            : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        )}
      >
        All
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tag/${tag}`}
          className={cn(
            'rounded px-3 py-1 text-xs font-medium transition-colors duration-150',
            activeTag === tag
              ? 'bg-[var(--text-primary)] text-[var(--bg-base)]'
              : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          )}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}
