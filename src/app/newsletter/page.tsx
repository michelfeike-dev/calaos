import type { Metadata } from 'next'
import { NewsletterForm, type InitialStatus } from '@/components/shared/newsletter-form'

export const metadata: Metadata = {
  title: 'brief',
  description: 'kein Bullshit. keine Werbung, kein Spam.',
  alternates: { canonical: '/newsletter' },
}

const VALID_STATUSES: InitialStatus[] = ['confirmed', 'unsubscribed', 'invalid']

interface PageProps {
  searchParams: Promise<{ status?: string }>
}

export default async function NewsletterPage({ searchParams }: PageProps) {
  const { status } = await searchParams
  const initialStatus = VALID_STATUSES.find((s) => s === status)

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <NewsletterForm initialStatus={initialStatus} />
    </main>
  )
}
