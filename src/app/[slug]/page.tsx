import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { compileMdxContent } from '@/lib/mdx'
import { getMdxComponents } from '@/components/mdx/mdx-components'
import { PostHeader } from '@/components/blog/post-header'
import { PostCard } from '@/components/blog/post-card'
import { NewsletterForm } from '@/components/shared/newsletter-form'
import { absoluteUrl } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/${post.slug}`,
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: absoluteUrl(`/api/og?title=${encodeURIComponent(post.title)}`),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [absoluteUrl(`/api/og?title=${encodeURIComponent(post.title)}`)],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const [{ content }, relatedPosts] = await Promise.all([
    compileMdxContent(post.content, getMdxComponents()),
    Promise.resolve(getRelatedPosts(slug, post.tags)),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'calaos',
      url: absoluteUrl('/about'),
    },
    publisher: {
      '@type': 'Organization',
      name: 'calaos',
      url: absoluteUrl('/'),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <article>
          <PostHeader post={post} />
          <div className="prose">{content}</div>

          {/* Newsletter CTA */}
          <NewsletterForm className="mt-20" />

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-20">
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/30">
                Weitere Artikel
              </h2>
              <div className="flex flex-col gap-3">
                {relatedPosts.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </section>
          )}

          {/* Contact */}
          <div className="mt-20 border-t border-white/[0.06] pt-10 text-center">
            <a
              href="mailto:blog@calaos.me"
              className="text-sm text-white/30 transition-colors duration-150 hover:text-blue-400"
            >
              Gedanken dazu? Schreib mir.
            </a>
          </div>
        </article>
      </div>
    </>

  )
}
