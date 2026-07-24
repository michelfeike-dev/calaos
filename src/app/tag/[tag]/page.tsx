import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllTags, getPostsByTag, getTagBySlug } from '@/lib/posts'
import { tagToSlug } from '@/lib/utils'
import { PostCard } from '@/components/blog/post-card'
import { TagFilter } from '@/components/blog/tag-filter'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tagToSlug(tag) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: slug } = await params
  const tag = getTagBySlug(slug)
  if (!tag) return {}
  return {
    title: tag,
    description: `All posts tagged with "${tag}".`,
    alternates: { canonical: `/tag/${slug}` },
  }
}

export default async function TagPage({ params }: Props) {
  const { tag: slug } = await params
  const tag = getTagBySlug(slug)

  if (!tag) notFound()

  const posts = getPostsByTag(tag)
  const allTags = getAllTags()

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="mb-8">
        <TagFilter tags={allTags} activeTag={tag} />
      </section>

      <section>
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}
