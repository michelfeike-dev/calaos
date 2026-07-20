import type { Book } from '@/types/book'

/**
 * Buchempfehlungen. Neue Bücher hier ergänzen.
 * `url` bestimmt das Klickziel der Karte (Standard: /essay).
 * (Platzhalter-Einträge — gern ersetzen.)
 */
export const books: Book[] = [
  {
    title: 'Bring den Müll raus',
    description:
      'Worte, Prinzipien, Werte, die meinen Entscheidungen Halt geben – mein Kompass für mehr Freiheit, Leichtigkeit und weniger Ballast.',
    author: 'Dr. Christian Zippel',
    tags: ['wachstum', 'chaos', 'calma'],
    url: '/essay',
  },
  {
    title: 'Trust Chaos',
    description:
      'Die Zeilen, die meinen Weg am stärksten geprägt haben. Ich lebe sie. Sie sind Teil meiner Identität geworden. Entscheidungen, die mich aus alten Mustern herausgeführt haben – Reisen, Neuanfänge, Risiken und persönliche Entwicklung – wurden von den Gedanken dieses Buches beeinflusst. Das Leben beginnt dort, wo man anfängt, mit dem Chaos zu tanzen.',
    author: 'Dr. Christian Zippel',
    tags: ['wachstum', 'chaos'],
    url: '/essay',
  },
  {
    title: '101 Essays, die dein Leben verändern werden',
    description:
      'Ich: am Tiefpunkt. Keine Erwartungen. Psychische Gesundheit, emotionale Intelligenz, Wachstum – Begriffe, die ich sonst abgetan hätte. Was harmlos begann, kippte schnell. Keine sanften Erkenntnisse, sondern ein Schlag in die Fresse. Tiefe Fragen – keine Antworten. Das Buch bestätigte nur, was ich längst wusste. Keine Perspektive. Ich war lost. Das Buch hat mir nichts erklärt. Es hat mich nur dahin gebracht, wo ich selbst hinschauen musste.',
    author: 'Brianna Wiest',
    tags: ['wachstum', 'chaos'],
    url: '/essay',
  },
]
