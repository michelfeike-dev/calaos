import { books } from '@/content/books'
import type { Book } from '@/types/book'

export function getAllBooks(): Book[] {
  return books.map((book) => ({ ...book, url: book.url || '/essay' }))
}

export function getAllBookTags(): string[] {
  const tags = new Set(books.flatMap((b) => b.tags))
  return Array.from(tags).sort()
}
