import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { parseAttribution } from '@/lib/attribution'
import type { Post } from '@/types/post'

interface PostHeaderProps {
  post: Post
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-14 text-center">

      {/* Title */}
      <h1 className="font-display mx-auto mb-7 max-w-3xl text-5xl font-normal leading-tight tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
        {post.title}
      </h1>

      {/* Author */}
      {post.author && (
        <p className="text-lg text-white/50">{post.author}</p>
      )}

      {/* Cover image — header width */}
      {post.coverImage && (
        <div className="group relative mx-auto mt-10 aspect-video w-full max-w-5xl overflow-hidden rounded-xl">
          <Image
            src={post.coverImage}
            alt={post.coverImageTitle ?? post.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            priority
          />

          {(() => {
            const credit = parseAttribution(post.coverImageCredit)
            if (!credit && !post.coverImageTitle) return null
            return (
              <div
                role="group"
                aria-label="Bildnachweis"
                className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-10 text-left text-xs text-white opacity-0 transition-opacity duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
              >
                {post.coverImageTitle && (
                  <span className="font-medium text-white">{post.coverImageTitle}</span>
                )}

                {credit &&
                  (credit.url ? (
                    <a
                      href={credit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Foto von ${credit.author} (öffnet in neuem Tab)`}
                      className="w-fit text-white/70 underline-offset-2 transition-colors duration-150 hover:text-blue-400 hover:underline"
                    >
                      Foto: {credit.author}
                    </a>
                  ) : (
                    <span className="text-white/70">Foto: {credit.author}</span>
                  ))}
              </div>
            )
          })()}
        </div>
      )}

      {/* Divider + Meta row */}
      <div className="mt-8 border-t border-white/[0.08] pt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/30">{post.readingTime}</span>
          <time className="text-blue-400/60" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
        </div>
      </div>

    </header>
  )
}
