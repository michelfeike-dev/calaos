import Link from 'next/link'
import type { Book } from '@/types/book'

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const href = book.url ?? '/blog'
  const isExternal = /^(https?:|mailto:)/.test(href)

  const card = (
    <div
      className={[
        'group flex h-full flex-col rounded-2xl',
        'border border-white/[0.08] border-l-2 border-l-transparent bg-[#1c1c1c]',
        'p-6 transition-all duration-200',
        'hover:border-white/[0.16] hover:border-l-blue-400/50 hover:bg-[#242424]',
      ].join(' ')}
    >
      {/* Title */}
      <h2 className="font-display mb-3 text-2xl font-normal leading-snug tracking-tight text-white transition-colors duration-150 group-hover:text-blue-400 sm:text-3xl">
        {book.title}
      </h2>

      {/* Description — full text, no truncation */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-white/50">
        {book.description}
      </p>

      {/* Footer — author (right, blue — like the blog post date) */}
      <div className="text-right text-xs text-blue-400/60">{book.author}</div>
    </div>
  )

  return (
    <article className="h-full">
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
          {card}
        </a>
      ) : (
        <Link href={href} className="block h-full">
          {card}
        </Link>
      )}
    </article>
  )
}
