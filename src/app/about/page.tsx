import type { Metadata } from 'next'
import { getPostBySlug } from '@/lib/posts'
import { compileMdxContent } from '@/lib/mdx'
import { getMdxComponents } from '@/components/mdx/mdx-components'
import { PostHeader } from '@/components/blog/post-header'
import { NewsletterForm } from '@/components/shared/newsletter-form'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'about',
  description: 'Michel teilt seine Reise von chaotischer Kindheit in Bayern über Berlin-Partys zur authentischen Freiheit.',
  alternates: { canonical: '/about' },
}

export default async function AboutPage() {
  const post = getPostBySlug('vom-jungen-zur-freiheit')
  if (!post) notFound()

  const { content } = await compileMdxContent(post.content, getMdxComponents())

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <PostHeader post={post} />
      <div className="prose">{content}</div>

      <NewsletterForm className="mt-20" />

      <div className="mt-20 border-t border-white/[0.06] pt-10 text-center">
        <a
          href="mailto:blog@calaos.me"
          className="text-sm text-white/30 transition-colors duration-150 hover:text-blue-400"
        >
          Gedanken dazu? Schreib mir.
        </a>
      </div>
    </div>
  )
}
