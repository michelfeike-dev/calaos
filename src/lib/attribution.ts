export interface Attribution {
  author: string
  url?: string
}

/**
 * Parses the credit convention `"Author Name | https://author-link.com"`.
 * Used both for inline MDX images (via the `title` attribute) and for the
 * post cover image (via the `coverImageCredit` frontmatter field).
 */
export function parseAttribution(credit?: string): Attribution | null {
  if (!credit) return null
  const [author, url] = credit.split('|').map((part) => part.trim())
  if (!author) return null
  return { author, url: url || undefined }
}
