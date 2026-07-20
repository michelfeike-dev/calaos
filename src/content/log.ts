import type { LogEntry } from '@/types/log'

/**
 * Logbuch — alltägliche Gedanken und Lektionen.
 * Neue Einträge einfach ergänzen; sortiert wird automatisch nach `date`.
 * (Platzhalter-Einträge — gern ersetzen.)
 */
export const log: LogEntry[] = [
  {
    title: 'Die Matte lügt nie',
    text: 'Wer sich selbst überschätzt, liegt nach dreißig Sekunden unten — und lernt mehr als in einem Monat Theorie.',
    date: '2026-07-12',
    ort: 'Berlin',
    tags: ['chaos', 'kampfsport'],
  },
  {
    title: 'Kalt duschen ist kein Trick',
    text: 'Es ist eine kleine, tägliche Abstimmung darüber, wer entscheidet: der Impuls oder ich.',
    date: '2026-07-08',
    ort: 'Berlin',
    tags: ['calma', 'disziplin'],
  },
  {
    title: 'Stille macht laut',
    text: 'Sie zeigt, was man tagsüber übertönt. Deshalb ist sie unbequem — und deshalb notwendig.',
    date: '2026-07-02',
    ort: 'Alpenrand',
    tags: ['calma'],
  },
]
