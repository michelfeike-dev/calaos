'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { BookCard } from './book-card'
import type { Book } from '@/types/book'

interface BooksBrowserProps {
  books: Book[]
  tags: string[]
}

export function BooksBrowser({ books, tags }: BooksBrowserProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag ? books.filter((b) => b.tags.includes(activeTag)) : books

  const pill = (active: boolean) =>
    cn(
      'rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150',
      active
        ? 'bg-blue-400/15 text-blue-400'
        : 'bg-white/[0.06] text-white/30 hover:bg-blue-400/10 hover:text-blue-400'
    )

  return (
    <>
      {tags.length > 0 && (
        <section className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => setActiveTag(null)} className={pill(activeTag === null)}>
              all
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={pill(activeTag === tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>
      )}

      <section>
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-white/30">noch keine Bücher.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((book) => (
              <BookCard key={book.title} book={book} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
