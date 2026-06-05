'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface TagFilterProps {
  tags: string[]
  activeTag?: string
  basePath?: string
}

export function TagFilter({ tags, activeTag, basePath = '/blog' }: TagFilterProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Link
        href={basePath}
        className={cn(
          'rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150',
          (pathname === basePath || pathname === '/') && !activeTag
            ? 'bg-blue-400/15 text-blue-400'
            : 'bg-white/[0.06] text-white/30 hover:bg-blue-400/10 hover:text-blue-400'
        )}
      >
        All
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tag/${tag}`}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150',
            activeTag === tag
              ? 'bg-blue-400/15 text-blue-400'
              : 'bg-white/[0.06] text-white/30 hover:bg-blue-400/10 hover:text-blue-400'
          )}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}
