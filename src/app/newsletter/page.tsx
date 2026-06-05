import type { Metadata } from 'next'
import { NewsletterForm } from '@/components/shared/newsletter-form'

export const metadata: Metadata = {
  title: 'brief',
  description: 'kein Bullshit. keine Werbung, kein Spam.',
}

export default function NewsletterPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <NewsletterForm />
    </main>
  )
}
