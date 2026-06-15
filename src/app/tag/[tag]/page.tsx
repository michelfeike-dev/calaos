import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllTags, getPostsByTag } from '@/lib/posts'
import { PostCard } from '@/components/blog/post-card'
import { TagFilter } from '@/components/blog/tag-filter'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  return {
    title: tag,
    description: `All posts tagged with "${tag}".`,
    alternates: { canonical: `/tag/${tag}` },
  }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const posts = getPostsByTag(tag)
  const allTags = getAllTags()

  if (!allTags.includes(tag)) notFound()

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
