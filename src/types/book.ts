export interface Book {
  title: string
  description: string
  tags: string[]
  author: string
  /** Where the card links to. Defaults to "/essay" when omitted. */
  url?: string
}
