import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'
import { Callout } from './callout'
import { ImageWithAttribution } from './image-with-attribution'

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

    // Optimized images with hover attribution overlay
    img: ({ src, alt, title, width, height }) => (
      <ImageWithAttribution
        src={src as string | undefined}
        alt={alt}
        title={title}
        width={width as number | string | undefined}
        height={height as number | string | undefined}
      />
    ),

    // Custom components available in MDX
    Callout,
  }
}
