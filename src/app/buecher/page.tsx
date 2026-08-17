import type { Metadata } from 'next'
import Link from 'next/link'
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

      {/* Subtitle — links to the newsletter ("brief") page */}
      <p className="mb-12 text-center">
        <Link
          href="/brief"
          className="text-base text-white/40 transition-colors duration-150 hover:text-blue-400 sm:text-sm"
        >
          fremde gedanken. eigene wege.
        </Link>
      </p>

      <BooksBrowser books={getAllBooks()} />

    </div>
  )
}
