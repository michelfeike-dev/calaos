import Image from 'next/image'
import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'
import { Callout } from './callout'

export function getMdxComponents(): MDXComponents {
  return {
    // Override anchor to use Next.js Link
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http')
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        )
      }
      return <Link href={href ?? '#'} {...props}>{children}</Link>
    },

    // Optimized images
    img: ({ src, alt, width, height, ...props }) => {
      if (!src) return null
      return (
        <span className="block my-8">
          <Image
            src={src as string}
            alt={alt ?? ''}
            width={(width as number) ?? 800}
            height={(height as number) ?? 450}
            className="rounded-lg"
            {...props}
          />
          {alt && (
            <span className="mt-2 block text-center text-xs text-[var(--text-muted)]">{alt}</span>
          )}
        </span>
      )
    },

    // Custom components available in MDX
    Callout,
  }
}
