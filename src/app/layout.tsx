import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'calaos.',
    template: '%s — calaos.',
  },
  description: 'Writings on visual design, creative process, and the details that matter.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://calaos.me'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'calaos',
    title: 'calaos — Design & Craft',
    description: 'Writings on visual design, creative process, and the details that matter.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'calaos — Design & Craft',
    description: 'Writings on visual design, creative process, and the details that matter.',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full dark`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <Header />
        <main className="flex flex-1 flex-col pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
