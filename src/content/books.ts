import type { Book } from '@/types/book'

/**
 * Buchempfehlungen. Neue Bücher hier ergänzen.
 * `url` bestimmt das Klickziel der Karte (Standard: /blog).
 * (Platzhalter-Einträge — gern ersetzen.)
 */
export const books: Book[] = [
  {
    title: '101 Essays, die dein Leben verändern werden',
    description:
      'Ich: am Tiefpunkt. Keine Erwartungen. Psychische Gesundheit, emotionale Intelligenz, Wachstum – Begriffe, die ich sonst abgetan hätte. Was harmlos begann, kippte schnell. Keine sanften Erkenntnisse, sondern ein Schlag in die Fresse. Tiefe Fragen – keine Antworten. Das Buch bestätigte nur, was ich längst wusste. Keine Perspektive. Ich war lost. Das Buch hat mir nichts erklärt. Es hat mich nur dahin gebracht, wo ich selbst hinschauen musste.',
    author: 'Brianna Wiest',
    tags: ['wachstum', 'chaos'],
    url: '/blog',
  },
]
