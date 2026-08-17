export interface Expedition {
  title: string
  text: string
  /** Ort der Expedition. Default: "weltweit" (solange nicht festgelegt). */
  ort?: string
  /** Datum. Default: "tbd" (solange nicht definiert). */
  date?: string
  /** Klickziel der Karte. Default: mailto an expedition@calaos.me
   *  (später z. B. eine Detailseite `/expedition/<slug>`). */
  url?: string
}
