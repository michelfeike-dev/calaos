export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  published: boolean
  featured?: boolean
  coverImage?: string
  /** Title/caption shown in the cover image overlay (also used as alt text) */
  coverImageTitle?: string
  /** Credit for the cover image: "Author Name | https://author-link.com" */
  coverImageCredit?: string
  author?: string
}

export interface Post extends PostFrontmatter {
  slug: string
  readingTime: string
  wordCount: number
}

export interface PostWithContent extends Post {
  content: string
}
