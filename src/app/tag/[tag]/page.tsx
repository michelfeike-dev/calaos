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
    title: `#${tag}`,
    description: `All posts tagged with "${tag}".`,
  }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const posts = getPostsByTag(tag)
  const allTags = getAllTags()

  if (!allTags.includes(tag)) notFound()

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-12">
        <h1 className="font-display mb-2 text-3xl font-normal tracking-tight text-[var(--text-primary)]">
          #{tag}
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </section>

      <section className="mb-8">
        <TagFilter tags={allTags} activeTag={tag} />
      </section>

      <section>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  )
}
