# Architecture

## Overview

calaos is a statically-generated blog with a minimal server footprint. The vast majority of content is pre-rendered at build time. Only two routes are dynamic: the newsletter subscription endpoint and the OG image generator.

```
Client Request
      │
      ▼
   Vercel Edge Network
      │
      ├── Static pages (/, /[slug], /tag/[tag], /about, /sitemap.xml)
      │   └── Pre-rendered HTML + JS — served from CDN
      │
      ├── /api/newsletter  — Node.js serverless function (Resend)
      └── /api/og          — Edge function (ImageResponse)
```

---

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── [slug]/page.tsx           # Article detail
│   ├── tag/[tag]/page.tsx        # Tag-filtered post list
│   ├── about/page.tsx            # About page
│   ├── api/newsletter/route.ts   # Resend subscription handler
│   ├── api/og/route.tsx          # Dynamic OG image (Edge)
│   ├── sitemap.ts                # Auto-generated sitemap
│   ├── robots.ts                 # Robots.txt
│   ├── layout.tsx                # Root layout (fonts, ThemeProvider)
│   ├── page.tsx                  # Blog index
│   └── globals.css               # Design tokens + global styles
│
├── components/
│   ├── blog/                     # Blog-specific UI
│   │   ├── post-card.tsx         # List item / featured card
│   │   ├── post-header.tsx       # Article header (title, meta, tags)
│   │   ├── table-of-contents.tsx # Sticky TOC (IntersectionObserver)
│   │   ├── tag-badge.tsx         # Pill tag with optional link
│   │   └── tag-filter.tsx        # Horizontal tag filter nav
│   ├── layout/                   # Site-level layout
│   │   ├── header.tsx            # Sticky nav with theme toggle
│   │   └── footer.tsx            # Site footer
│   ├── mdx/                      # MDX rendering layer
│   │   ├── callout.tsx           # Info/warning/success/error callout
│   │   └── mdx-components.tsx    # Component map for compileMDX
│   ├── shared/                   # Cross-feature shared components
│   │   ├── giscus-comments.tsx   # Lazy-loaded GitHub Discussions
│   │   ├── newsletter-form.tsx   # Email capture form
│   │   ├── theme-provider.tsx    # next-themes wrapper
│   │   └── theme-toggle.tsx      # Sun/moon toggle button
│   └── ui/                       # shadcn/ui primitives (headless)
│
├── content/
│   └── posts/                    # *.mdx article files
│
├── lib/
│   ├── mdx.ts                    # MDX compilation (compileMdxContent, extractToc)
│   ├── posts.ts                  # File-system post CRUD (getAllPosts, getPostBySlug…)
│   └── utils.ts                  # cn(), formatDate(), absoluteUrl()
│
├── hooks/                        # Custom React hooks
└── types/
    └── post.ts                   # Post, PostFrontmatter, PostWithContent
```

---

## Content Pipeline

```
src/content/posts/my-post.mdx
         │
         ▼  gray-matter (build time)
         │  ─ parses YAML frontmatter → PostFrontmatter
         │  ─ extracts raw MDX body
         │
         ▼  reading-time (build time)
         │  ─ computes word count + estimated reading time
         │
         ▼  getAllPosts() / getPostBySlug()
         │  ─ returns typed Post / PostWithContent
         │
         ▼  compileMdxContent() (request time, RSC)
            ─ compileMDX from next-mdx-remote/rsc
            ─ remark: remark-gfm (GFM tables, strikethrough)
            ─ rehype: rehype-slug, rehype-autolink-headings
            ─ rehype: rehype-pretty-code (shiki syntax highlighting)
            → ReactElement (server component, zero client JS)
```

---

## Rendering Strategy

| Route | Strategy | Notes |
|---|---|---|
| `/` | Static (SSG) | Re-build required for new posts |
| `/[slug]` | SSG via `generateStaticParams` | All posts built at deploy time |
| `/tag/[tag]` | SSG via `generateStaticParams` | All tags pre-rendered |
| `/about` | Static | |
| `/api/newsletter` | Dynamic (Node.js) | Stateless, runs on demand |
| `/api/og` | Edge Runtime | ~50ms cold start, cached by Vercel |
| `/sitemap.xml` | Static | Generated from all posts |
| `/robots.txt` | Static | |

---

## SEO Architecture

Every article includes:

- `<title>` via `generateMetadata()`
- `<meta name="description">` from frontmatter
- OpenGraph title/description/image (dynamic `/api/og`)
- Twitter card
- `<link rel="canonical">`
- JSON-LD `Article` structured data
- Semantic HTML: `<article>`, `<main>`, `<header>`, `<nav>`, `<aside>`

---

## Design Decisions

### Why MDX over a headless CMS?

For a solo author, the DX of editing MDX in a code editor is superior to any CMS UI. Git provides version history, branching for drafts, and zero third-party dependency. The tradeoff is no WYSIWYG editing and a redeploy required per post. Both are acceptable for this use case.

### Why next-mdx-remote over @next/mdx?

`next-mdx-remote/rsc` compiles MDX at request time in a React Server Component, giving full control over the rehype/remark plugin chain without requiring webpack loader configuration. This makes it easier to add code-highlighting, slug generation, and heading links without touching `next.config.ts`.

### Why TailwindCSS v4 over v3?

v4 uses native CSS cascade layers and CSS custom properties as the configuration surface. This eliminates the JavaScript config file and makes design tokens available as CSS variables — enabling seamless integration with `next-themes` dark mode without any JS theme-switching overhead.

### Why Giscus over Disqus / custom comments?

Giscus maps comments to GitHub Discussions. Zero backend, free, spam-resistant (requires GitHub login), and the audience (designers/developers) already has GitHub accounts. The tradeoff is that non-technical readers can't comment without a GitHub account — acceptable for this blog's target audience.
