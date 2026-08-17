import type { Metadata } from 'next'
import { getAllBooks } from '@/lib/books'
import { BooksBrowser } from '@/components/books/books-browser'

export const metadata: Metadata = {
  title: 'bücher',
  description: 'Bücher, die meinen Weg zwischen calma und chaos geprägt haben.',
  alternates: { canonical: '/buecher' },
}

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">

      {/* Subtitle */}
      <p className="mb-12 text-center text-base text-white/40 sm:text-sm">
        fremde gedanken. eigene wege.
      </p>

      <BooksBrowser books={getAllBooks()} />

    </div>
  )
}
