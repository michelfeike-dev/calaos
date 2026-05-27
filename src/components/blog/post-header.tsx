import { TagBadge } from '@/components/blog/tag-badge'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types/post'

interface PostHeaderProps {
  post: Post
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-12">
      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="font-display mb-4 text-3xl font-normal leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl">
        {post.title}
      </h1>

      {/* Description */}
      <p className="mb-6 text-lg leading-relaxed text-[var(--text-muted)]">
        {post.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span>{post.readingTime}</span>
      </div>

      {/* Divider */}
      <div className="mt-8 border-b border-[var(--border)]" />
    </header>
  )
}
