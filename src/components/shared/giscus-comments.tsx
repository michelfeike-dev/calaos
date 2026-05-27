'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

export function GiscusComments() {
  const { resolvedTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

    if (!repo || !repoId || !categoryId) return

    const existingScript = containerRef.current.querySelector('script')
    if (existingScript) existingScript.remove()

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-repo', repo)
    script.setAttribute('data-repo-id', repoId)
    script.setAttribute('data-category', 'Comments')
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', resolvedTheme === 'dark' ? 'dark_dimmed' : 'light')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('data-loading', 'lazy')

    containerRef.current.appendChild(script)
  }, [resolvedTheme])

  return <div ref={containerRef} className="mt-2" />
}
