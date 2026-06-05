import Image from 'next/image'
import { parseAttribution } from '@/lib/attribution'

interface ImageWithAttributionProps {
  src?: string
  alt?: string
  /** Markdown image title: "Author Name | https://author-link.com" */
  title?: string
  width?: number | string
  height?: number | string
}

/**
 * Renders an optimized image and, when attribution data is present in the
 * markdown title, reveals a credit overlay on hover / keyboard focus.
 * The overlay is absolutely positioned, so it never affects image layout.
 */
export function ImageWithAttribution({
  src,
  alt,
  title,
  width,
  height,
}: ImageWithAttributionProps) {
  if (!src) return null

  const attribution = parseAttribution(title)

  return (
    <span className="group relative my-8 block overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt ?? ''}
        width={Number(width) || 800}
        height={Number(height) || 450}
        className="block h-auto w-full rounded-lg"
      />

      {attribution && (
        <span
          role="group"
          aria-label="Bildnachweis"
          className={[
            'pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-0.5',
            'bg-gradient-to-t from-black/80 via-black/40 to-transparent',
            'px-4 pb-3 pt-8 text-xs text-white',
            'opacity-0 transition-opacity duration-300 ease-out',
            'group-hover:pointer-events-auto group-hover:opacity-100',
            'group-focus-within:pointer-events-auto group-focus-within:opacity-100',
          ].join(' ')}
        >
          {alt && <span className="font-medium text-white">{alt}</span>}

          {attribution.url ? (
            <a
              href={attribution.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Foto von ${attribution.author} (öffnet in neuem Tab)`}
              className="w-fit text-white/70 underline-offset-2 transition-colors duration-150 hover:text-blue-400 hover:underline"
            >
              Foto: {attribution.author}
            </a>
          ) : (
            <span className="text-white/70">Foto: {attribution.author}</span>
          )}
        </span>
      )}
    </span>
  )
}
