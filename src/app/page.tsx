import type { Metadata } from 'next'
import { getAllPosts, getAllTags, getFeaturedPost } from '@/lib/posts'
import { PostCard } from '@/components/blog/post-card'
import { TagFilter } from '@/components/blog/tag-filter'

export const metadata: Metadata = {
  title: 'calaos — Design & Craft',
  description: 'Writings on visual design, creative process, and the details that matter.',
}

export default function BlogIndexPage() {
  const allPosts = getAllPosts()
  const featuredPost = getFeaturedPost()
  const allTags = getAllTags()
  const remainingPosts = featuredPost
    ? allPosts.filter((p) => p.slug !== featuredPost.slug)
    : allPosts

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="font-display mb-3 text-4xl font-normal tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Design & Craft
        </h1>
        <p className="text-base text-[var(--text-muted)]">
          Writings on visual design, creative process, and the details that matter.
        </p>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="mb-12">
          <PostCard post={featuredPost} featured />
        </section>
      )}

      {/* Tag filter */}
      {allTags.length > 0 && (
        <section className="mb-8">
          <TagFilter tags={allTags} />
        </section>
      )}

      {/* Post list */}
      <section>
        {remainingPosts.length === 0 ? (
          <p className="py-12 text-center text-sm text-[var(--text-muted)]">No posts yet.</p>
        ) : (
          <div>
            {remainingPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
