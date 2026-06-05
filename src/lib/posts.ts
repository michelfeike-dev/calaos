import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Post, PostWithContent } from '@/types/post'

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts')

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))
}

export function getAllPosts(): Post[] {
  const files = getPostFiles()

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      const stats = readingTime(content)

      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        tags: (data.tags as string[]) ?? [],
        published: (data.published as boolean) ?? false,
        featured: (data.featured as boolean) ?? false,
        coverImage: data.coverImage as string | undefined,
        coverImageTitle: data.coverImageTitle as string | undefined,
        coverImageCredit: data.coverImageCredit as string | undefined,
        author: data.author as string | undefined,
        readingTime: stats.text,
        wordCount: stats.words,
      } satisfies Post
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    published: (data.published as boolean) ?? false,
    featured: (data.featured as boolean) ?? false,
    coverImage: data.coverImage as string | undefined,
    coverImageTitle: data.coverImageTitle as string | undefined,
    coverImageCredit: data.coverImageCredit as string | undefined,
    author: data.author as string | undefined,
    readingTime: stats.text,
    wordCount: stats.words,
    content,
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set(posts.flatMap((p) => p.tags))
  return Array.from(tags).sort()
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag))
}

export function getFeaturedPost(): Post | undefined {
  const posts = getAllPosts()
  return posts.find((p) => p.featured) ?? posts[0]
}

export function getRelatedPosts(slug: string, tags: string[], limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.tags.some((t) => tags.includes(t)))
    .slice(0, limit)
}
