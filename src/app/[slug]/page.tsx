import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { compileMdxContent, extractToc } from '@/lib/mdx'
import { getMdxComponents } from '@/components/mdx/mdx-components'
import { PostHeader } from '@/components/blog/post-header'
import { PostCard } from '@/components/blog/post-card'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { GiscusComments } from '@/components/shared/giscus-comments'
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

  const tocItems = extractToc(post.content)

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
        <div className="xl:relative">
          {/* Sticky TOC on wide screens */}
          {tocItems.length > 0 && (
            <aside className="absolute left-full top-0 ml-10 hidden w-56 xl:block">
              <div className="sticky top-24">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          )}

          <article>
            <PostHeader post={post} />

            {/* MDX content */}
            <div className="prose">{content}</div>

            {/* Newsletter CTA */}
            <NewsletterForm className="mt-16" />

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Related
                </h2>
                <div>
                  {relatedPosts.map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
              </section>
            )}

            {/* Comments */}
            <section className="mt-16">
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Discussion
              </h2>
              <GiscusComments />
            </section>
          </article>
        </div>
      </div>
    </>
  )
}
