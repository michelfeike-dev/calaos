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
| UI | shadcn/ui (headless, copy-paste) |
| Animations | Framer Motion |
| Dark Mode | next-themes (system + manual toggle) |
| Syntax Highlighting | rehype-pretty-code + shiki |
| Comments | Giscus (GitHub Discussions) |
| Newsletter | Resend |
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

The filename becomes the URL slug: `my-post.mdx` → `calaos.io/my-post`.

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
| `NEXT_PUBLIC_SITE_URL` | Yes | Production URL |
| `RESEND_API_KEY` | For newsletter | Resend API key |
| `RESEND_AUDIENCE_ID` | For newsletter | Resend audience ID |
| `NEXT_PUBLIC_GISCUS_REPO` | For comments | `owner/repo` |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | For comments | From giscus.app |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | For comments | From giscus.app |

---

## Scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
pnpm format       # Format with Prettier
```

---

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — System architecture, design decisions
- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) — Color tokens, typography, spacing
- [CONTRIBUTING.md](CONTRIBUTING.md) — Branch strategy, commit conventions
- [DEPLOYMENT.md](DEPLOYMENT.md) — Vercel setup, custom domain, CI/CD
