import Link from 'next/link'
import { TagBadge } from '@/components/blog/tag-badge'
import { formatDateShort } from '@/lib/utils'
import type { Post } from '@/types/post'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <article className="group border-b border-[var(--border)] pb-12">
        <Link href={`/${post.slug}`} className="block">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-widest text-[var(--accent-vivid)]">
              Featured
            </span>
            <span className="text-xs text-[var(--text-faint)]">—</span>
            <time
              dateTime={post.date}
              className="text-xs text-[var(--text-muted)]"
            >
              {formatDateShort(post.date)}
            </time>
          </div>

          <h2 className="font-display mb-3 text-3xl font-normal leading-tight tracking-tight text-[var(--text-primary)] transition-opacity duration-150 group-hover:opacity-70 sm:text-4xl">
            {post.title}
          </h2>

          <p className="mb-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
            {post.description}
          </p>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
          <span className="text-xs text-[var(--text-faint)]">{post.readingTime}</span>
        </div>
      </article>
    )
  }

  return (
    <article className="group border-b border-[var(--border)] py-6 last:border-0">
      <Link href={`/${post.slug}`} className="block">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="mb-1.5 text-base font-medium leading-snug text-[var(--text-primary)] transition-opacity duration-150 group-hover:opacity-70">
              {post.title}
            </h2>
            <p className="line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
              {post.description}
            </p>
          </div>

          <time
            dateTime={post.date}
            className="shrink-0 text-xs text-[var(--text-faint)] sm:pt-0.5"
          >
            {formatDateShort(post.date)}
          </time>
        </div>
      </Link>

      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  )
}
