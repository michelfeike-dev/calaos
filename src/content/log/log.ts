import type { LogEntry } from '@/types/log'

/**
 * Logbuch — alltägliche Gedanken und Lektionen.
 * Neue Einträge einfach ergänzen; sortiert wird automatisch nach `date`.
 * (Platzhalter-Einträge — gern ersetzen.)
 */
export const log: LogEntry[] = [
  {
    title: 'Mein verletztes Ego, meine Hölle',
    text: 'Keine Antwort auf meine Nachricht. Kein Interesse hier. Ein Korb dort. Die Einsamkeit in mir wächst. Mein Ego rast. Es sucht nach Fehlern. Im Spiegel. Im Außen. Bei Freunden. In der Familie. Die Nadel im Heuhaufen. Overthinking. Menschen, die mir nahestehen, drücke ich weg. Familie. Freunde. Neue Menschen machen mir Angst. Die Einsamkeit nimmt zu. Ich isoliere mich und frage mich gleichzeitig, warum ich mich einsam fühle. Ein Teufelskreis.',
    date: '2026-07-20',
    ort: 'Berlin',
    tags: ['chaos', 'selbstwert', 'beziehungen'],
  },
]
