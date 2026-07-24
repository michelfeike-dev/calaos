import type { LogEntry } from '@/types/log'

/**
 * Logbuch — alltägliche Gedanken und Lektionen.
 * Neue Einträge einfach ergänzen; sortiert wird automatisch nach `date`.
 * (Platzhalter-Einträge — gern ersetzen.)
 * tags: ["calma", "chaos", "selbstwert", "identität", "beziehungen", "freundschaft", "männlichkeit", "emotionen", "jiu-jitsu", "muay thai", "kraftsport", "meditation", "reisen", "abenteuer", "natur", "verantwortung", "freiheit", "disziplin", "loyalität", "authentizität"]
 */
export const log: LogEntry[] = [
  {
    title: 'Niemand macht etwas',
    text: 'Ein Mann in meinem Alter sitzt in der U-Bahn. Blick auf den Boden. Die Tränen laufen ihm herunter. Von Station zu Station beobachte ich ihn. Ich wünschte, ich könnte ihm helfen, ihn umarmen, menschlich sein. Ich zögere. Alle zögern. Niemand macht etwas. Wieso? Ich sammle meinen Mut, stehe auf und frage ihn, ob er eine Umarmung braucht. Er lehnt zuerst ab. Dann ändert er seine Meinung. Wir umarmen uns. Ich spüre seine Trauer, seine Verzweiflung. Er krallt sich an mich. Ich versuche, ihm Halt zu geben. Er freut sich zutiefst, bedankt sich einige Male. Wir verlassen die Bahn.',
    date: '2026-07-22',
    ort: 'Berlin',
    tags: ['beziehungen', 'emotionen'],
  },
  {
    title: 'Mein verletztes Ego, mein Dämon',
    text: 'Keine Antwort auf meine Nachricht. Kein Interesse hier. Ein Korb dort. Die Einsamkeit in mir wächst. Mein Ego rast. Es sucht nach Fehlern. Im Spiegel. Im Außen. Bei Freunden. In der Familie. Die Nadel im Heuhaufen. Overthinking. Menschen, die mir nahestehen, drücke ich weg. Familie. Freunde. Neue Menschen machen mir Angst. Die Einsamkeit nimmt zu. Ich isoliere mich und frage mich gleichzeitig, warum ich mich einsam fühle. Ein Teufelskreis.',
    date: '2026-07-20',
    ort: 'Berlin',
    tags: ['chaos', 'selbstwert', 'beziehungen'],
  },
]
