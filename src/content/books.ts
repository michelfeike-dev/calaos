import type { Book } from '@/types/book'

/**
 * Buchempfehlungen. Neue Bücher hier ergänzen.
 * `url` bestimmt das Klickziel der Karte (Standard: /blog).
 * (Platzhalter-Einträge — gern ersetzen.)
 */
export const books: Book[] = [
  {
    title: 'Trust Chaos',
    description:
      'Über den Mut, Verantwortung zu übernehmen und die Komfortzone bewusst zu verlassen.',
    author: 'Dr. Christian Zippel',
    tags: ['chaos', 'wachstum'],
    url: '/blog',
  },
  {
    title: 'Die Kunst des Liebens',
    description:
      'Liebe als Haltung und Fähigkeit, nicht als Zufall — ein Klassiker über Selbst und Beziehung.',
    author: 'Erich Fromm',
    tags: ['calma', 'philosophie'],
    url: '/blog',
  },
  {
    title: 'Die 1%-Methode',
    description:
      'Wie kleine Gewohnheiten über die Zeit zu großer Veränderung führen.',
    author: 'James Clear',
    tags: ['wachstum', 'gewohnheiten'],
    url: '/blog',
  },
]
