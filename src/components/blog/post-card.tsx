import Link from 'next/link'
import { formatDateShort } from '@/lib/utils'
import type { Post } from '@/types/post'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <article className="group relative">
        <Link href={`/${post.slug}`} className="block">
          <div
            className={[
              'relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1c1c1c]',
              'p-8 transition-all duration-200',
              'hover:border-white/[0.16] hover:bg-[#242424]',
              'border-t-2 border-t-blue-400/30',
            ].join(' ')}
          >
            {/* Title */}
            <h2 className="font-display mb-3 text-2xl font-normal leading-snug tracking-tight text-white transition-colors duration-150 group-hover:text-blue-400 sm:text-3xl">
              {post.title}
            </h2>

            {/* Description */}
            <p className="mb-6 text-sm leading-relaxed text-white/50">
              {post.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/30">{post.readingTime}</span>
              <time className="text-blue-400/60" dateTime={post.date}>
                {formatDateShort(post.date)}
              </time>
            </div>

            {/* Featured indicator */}
            <div className="absolute right-6 top-5">
              <span className="rounded-full bg-blue-400/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-blue-400">
                Featured
              </span>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className="group">
      <Link href={`/${post.slug}`} className="block h-full">
        <div
          className={[
            'relative flex aspect-[3/2] flex-col overflow-hidden rounded-2xl',
            'border border-white/[0.08] border-l-2 border-l-transparent bg-[#1c1c1c]',
            'p-6 transition-all duration-200',
            'hover:border-white/[0.16] hover:border-l-blue-400/50 hover:bg-[#242424]',
          ].join(' ')}
        >
          {/* Title */}
          <h2 className="font-display mb-3 text-2xl font-normal leading-snug tracking-tight text-white transition-colors duration-150 group-hover:text-blue-400 sm:text-3xl">
            {post.title}
          </h2>

          {/* Description */}
          <p className="mb-4 flex-1 text-sm leading-relaxed text-white/50 line-clamp-3">
            {post.description}
          </p>

          {/* Footer meta */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/30">{post.readingTime}</span>
            <time className="text-blue-400/60" dateTime={post.date}>
              {formatDateShort(post.date)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  )
}
