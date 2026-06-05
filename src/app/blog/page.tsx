import type { Metadata } from 'next'
import { getAllPosts, getAllTags, getFeaturedPost } from '@/lib/posts'
import { PostCard } from '@/components/blog/post-card'
import { TagFilter } from '@/components/blog/tag-filter'

export const metadata: Metadata = {
  title: 'blog',
  description: 'Writings on visual design, creative process, and the details that matter.',
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const featuredPost = getFeaturedPost()
  const allTags = getAllTags()
  const remainingPosts = featuredPost
    ? allPosts.filter((p) => p.slug !== featuredPost.slug)
    : allPosts

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">

      {/* Tag filter */}
      {allTags.length > 0 && (
        <section className="mb-8">
          <TagFilter tags={allTags} basePath="/blog" />
        </section>
      )}

      {/* Featured post — full width */}
      {featuredPost && (
        <section className="mb-8">
          <PostCard post={featuredPost} featured />
        </section>
      )}

      {/* Post grid */}
      <section>
        {remainingPosts.length === 0 ? (
          <p className="py-16 text-center text-sm text-white/30">No posts yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {remainingPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}
