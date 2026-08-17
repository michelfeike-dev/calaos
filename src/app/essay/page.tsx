import type { Metadata } from 'next'
import { getAllPosts, getFeaturedPost } from '@/lib/posts'
import { PostCard } from '@/components/blog/post-card'

export const metadata: Metadata = {
  title: 'essay',
  description: 'Writings on visual design, creative process, and the details that matter.',
  alternates: { canonical: '/essay' },
}

export default function EssayPage() {
  const allPosts = getAllPosts()
  const featuredPost = getFeaturedPost()
  const remainingPosts = featuredPost
    ? allPosts.filter((p) => p.slug !== featuredPost.slug)
    : allPosts

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">

      {/* Subtitle */}
      <p className="mb-12 text-center text-base text-white/40 sm:text-sm">
        zeilen, die zwischen feuer und erde entstehen.
      </p>

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
