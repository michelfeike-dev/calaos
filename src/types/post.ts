export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  published: boolean
  featured?: boolean
  coverImage?: string
}

export interface Post extends PostFrontmatter {
  slug: string
  readingTime: string
  wordCount: number
}

export interface PostWithContent extends Post {
  content: string
}
