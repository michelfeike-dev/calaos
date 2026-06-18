import type { Metadata } from 'next'
import { getAllBooks, getAllBookTags } from '@/lib/books'
import { BooksBrowser } from '@/components/books/books-browser'

export const metadata: Metadata = {
  title: 'bücher',
  description: 'Bücher, die meinen Weg zwischen calma und chaos geprägt haben.',
  alternates: { canonical: '/buecher' },
}

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <BooksBrowser books={getAllBooks()} tags={getAllBookTags()} />
    </div>
  )
}
