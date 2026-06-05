# calaos

> A dark-premium design blog. Minimalist, timeless, production-ready.

Built with Next.js 16, TailwindCSS v4, MDX, and deployed on Vercel.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, RSC) |
| Language | TypeScript |
| Styling | TailwindCSS v4 + CSS Custom Properties |
| Content | MDX (file-based, Git-versioned) |
| Animations | Framer Motion |
| Theme | Dark-only (hardcoded, no theme switcher) |
| Syntax Highlighting | rehype-pretty-code + shiki |
| Newsletter | Resend |
| Contact | `mailto:` links (no comment system) |
| Hosting | Vercel |
| CI/CD | GitHub Actions |

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Writing Posts

Create `.mdx` files in `src/content/posts/`. Each file needs this frontmatter:

```mdx
---
title: "Post Title"
description: "One-sentence description for SEO and previews."
date: "2024-01-15"
tags: ["design", "typography"]
published: true
featured: false
---

Your content here...
```

The filename becomes the URL slug: `my-post.mdx` → `calaos.me/my-post`.

### Cover Image

Add an optional cover image to any post via the `coverImage` frontmatter field:

```mdx
---
title: "Post Title"
coverImage: "/images/posts/my-post/cover.jpg"
coverImageTitle: "Sonnenaufgang über den Alpen"
coverImageCredit: "Thales Botelho | https://unsplash.com/@thales"
author: "Michel Feike"
published: true
---
```

| Field | Required | Purpose |
|---|---|---|
| `coverImage` | – | Path to the image under `public/` |
| `coverImageTitle` | optional | Caption shown in the hover overlay (also used as `alt` text) |
| `coverImageCredit` | optional | Attribution as `"Author Name \| https://author-link.com"` (URL optional) |

**Attribution overlay:** When `coverImageTitle` and/or `coverImageCredit` are set, a
credit overlay fades in on hover (and on keyboard focus). The author becomes a link
that opens in a new tab. This uses the same `"Author | URL"` convention as inline
images (see [Image Attribution](#image-attribution) below).

**Where to save:**

```
public/
└── images/
    └── posts/
        └── my-post-slug/   ← one folder per post, named after the slug
            └── cover.jpg
```

**Optimal specs:**

| Property | Value |
|---|---|
| Aspect ratio | **16:9** — the image renders in an `aspect-video` container |
| Dimensions | **1600 × 900 px** (minimum: 1280 × 720) |
| Format | **JPEG** for photos · **WebP** for best compression · **PNG only** for graphics/logos |
| Source file size | **Under 500 KB** before adding to the repo |

> Next.js automatically converts and serves AVIF/WebP to supporting browsers (configured in `next.config.ts`). But the source file is stored on disk as-is — so optimize it before committing.

**How to compress before saving (free tools):**

| Tool | How |
|---|---|
| [Squoosh](https://squoosh.app) | Browser-based · drag & drop · export as WebP/JPEG with quality slider |
| ImageOptim (Mac) | Drag & drop · lossless/lossy compression |
| Sharp CLI | `npx sharp-cli -i input.png -o cover.jpg -f jpeg -q 85` |

**Common mistake — PNG for photos:**  
PNG is lossless and correct for logos/graphics with transparency. For photographs it produces files 5–10× larger than JPEG at the same visual quality. Always use JPEG or WebP for photos.

**If no `coverImage` is set**, a dark gradient placeholder is shown — the post still renders correctly.

**Troubleshooting — image not showing:**  
Make sure the path in the frontmatter exactly matches the file location under `public/`. Example: file at `public/images/posts/my-post/cover.jpg` → frontmatter value `/images/posts/my-post/cover.jpg`.

### Image Attribution

Inline images inside the post body support the same attribution overlay as the cover
image — no per-post setup, every markdown image is handled automatically. Use the
standard markdown image syntax and store the credit in the **title** (the part in
quotes):

```markdown
![Sonnenaufgang über den Alpen](/images/posts/my-post/photo.jpg "Thales Botelho | https://unsplash.com/@thales")
```

| Part | Maps to | Shown as |
|---|---|---|
| `![ ... ]` (alt) | image title | bold caption line in the overlay |
| `" ... "` before `\|` | author name | `Foto: <author>` |
| `" ... "` after `\|` | author URL (optional) | makes the author a link (new tab) |

On hover (or keyboard focus) a gradient overlay fades in at the bottom of the image
showing the title and a clickable `Foto: <author>` credit. The overlay is absolutely
positioned, so it never shifts the surrounding text. Implemented in
[`ImageWithAttribution`](src/components/mdx/image-with-attribution.tsx); the shared
parser lives in [`src/lib/attribution.ts`](src/lib/attribution.ts).

Images **without** a title render normally, with no overlay.

### Custom MDX Components

```mdx
<Callout type="info" title="Optional title">
  Content here.
</Callout>
```

Types: `info` | `warning` | `success` | `error`

---

## Environment Variables

See [.env.example](.env.example) for all required variables.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Production URL (e.g. `https://calaos.me`) |
| `RESEND_API_KEY` | For newsletter | Resend API key |
| `RESEND_AUDIENCE_ID` | For newsletter | Resend audience ID |

> The newsletter API route returns `503` gracefully when the Resend variables are absent, so the site builds and runs without them.

---

## Scripts

```bash
pnpm dev               # Start dev server
pnpm build             # Production build
pnpm start             # Start production server
pnpm lint              # Run ESLint
pnpm type-check        # Run TypeScript checks
pnpm format            # Format with Prettier
pnpm format:check      # Check formatting without writing
pnpm generate:favicon  # Regenerate favicon.ico from public/icon.svg
```

### Favicon

The brand icon lives at `public/icon.svg`. After changing it, run `pnpm generate:favicon`
to rebuild `src/app/favicon.ico` (16/32/48 px, embedded PNGs — Safari-compatible).
`src/app/icon.tsx` additionally serves a generated PNG for modern browsers.

---

## Quality Checks

Before every commit / deploy, run the full suite (this is also what CI enforces):

```bash
pnpm lint && pnpm type-check && pnpm build
```

| Step | What it catches |
|---|---|
| `pnpm lint` | ESLint + Next.js rules (unescaped entities, `<a>` vs `<Link>`, image hints) |
| `pnpm type-check` | `tsc --noEmit` — full type safety |
| `pnpm build` | Production build + static generation of all routes |

A green build statically prerenders all content routes (`/`, `/blog`, `/about`,
`/coach`, legal pages, every post and tag); `/api/*` stay dynamic by design.

---

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — System architecture, design decisions
- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) — Color tokens, typography, spacing
- [CONTRIBUTING.md](CONTRIBUTING.md) — Branch strategy, commit conventions
- [DEPLOYMENT.md](DEPLOYMENT.md) — Vercel setup, custom domain, CI/CD
