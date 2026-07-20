import type { LogEntry } from '@/types/log'

/**
 * Logbuch — alltägliche Gedanken und Lektionen.
 * Neue Einträge oben oder unten ergänzen; sortiert wird automatisch nach `date`.
 * (Platzhalter-Einträge — gern ersetzen.)
 */
export const log: LogEntry[] = [
  {
    text: 'Die Matte lügt nie. Wer sich selbst überschätzt, liegt nach dreißig Sekunden unten — und lernt mehr als in einem Monat Theorie.',
    date: '2026-07-12',
    ort: 'Berlin',
    tags: ['chaos', 'kampfsport'],
  },
  {
    text: 'Kalt duschen ist kein Trick. Es ist eine kleine, tägliche Abstimmung darüber, wer entscheidet: der Impuls oder ich.',
    date: '2026-07-08',
    ort: 'Berlin',
    tags: ['calma', 'disziplin'],
  },
  {
    text: 'Stille macht laut, was man tagsüber übertönt. Deshalb ist sie unbequem — und deshalb notwendig.',
    date: '2026-07-02',
    ort: 'Alpenrand',
    tags: ['calma'],
  },
]
