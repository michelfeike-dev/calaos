export interface LogEntry {
  title: string
  /** Der Eintrag selbst — ein Gedanke, eine Lektion. */
  text: string
  /** Format JJJJ-MM-TT — bestimmt die Sortierung (neueste zuerst). */
  date: string
  /** Ort, an dem der Eintrag entstand. */
  ort: string
  tags: string[]
}
