import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'A blog about visual design, creative process, and the details that matter.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <article className="prose">
        <h1>About</h1>

        <p>
          calaos is a place for writing about visual design, creative process, and
          the small decisions that define the quality of what we make.
        </p>

        <p>
          The focus is on craft — the kind of attention to detail that separates
          something good from something great. Typography, spacing, interaction,
          system thinking, and the invisible work that makes things feel right.
        </p>

        <p>
          Writing is a way of thinking. These posts are part observation, part
          argument, part note to self.
        </p>

        <hr />

        <h2>Get in touch</h2>

        <p>
          If something resonated, disagreed with you, or you just want to talk
          design — feel free to reach out.
        </p>
      </article>
    </div>
  )
}
