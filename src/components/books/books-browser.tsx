import { BookCard } from './book-card'
import type { Book } from '@/types/book'

interface BooksBrowserProps {
  books: Book[]
}

export function BooksBrowser({ books }: BooksBrowserProps) {
  return (
    <section>
      {books.length === 0 ? (
        <p className="py-16 text-center text-sm text-white/30">noch keine Bücher.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {books.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      )}
    </section>
  )
}
