# Deployment

## Overview

calaos deploys automatically to Vercel on every push to `main`. Preview deployments are created for every pull request.

---

## Initial Setup

### 1. GitHub Repository

```bash
git init
git add .
git commit -m "feat: initial calaos blog"
git remote add origin https://github.com/YOUR_USERNAME/calaos.git
git push -u origin main
```

### 2. Vercel Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `.` (default)
5. Add environment variables (see below)
6. Deploy

### 3. Custom Domain

In the Vercel dashboard:
1. Project → Settings → Domains
2. Add `calaos.me`
3. Follow DNS configuration instructions (typically add an `A` record or `CNAME`)

### 4. Environment Variables

Add these in Vercel → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL=https://calaos.me
RESEND_API_KEY=re_xxxxxxxx
RESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_GISCUS_REPO=username/calaos
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxxxxxxxxxx
```

Set all to **Production** + **Preview** environments.

---

## Setting Up Giscus (Comments)

1. Enable GitHub Discussions on the repository (Settings → Features → Discussions)
2. Visit [giscus.app](https://giscus.app)
3. Enter your repository name
4. Select **Discussion Category**: create a category named "Comments"
5. Mapping: **Pathname**
6. Copy the `repo`, `repoId`, and `categoryId` values
7. Add to Vercel environment variables

---

## Setting Up Resend (Newsletter)

1. Create account at [resend.com](https://resend.com)
2. Settings → API Keys → Create API Key (full access)
3. Audiences → Create Audience (name: "calaos subscribers")
4. Copy the Audience ID
5. Add `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` to Vercel

---

## CI/CD Pipeline

GitHub Actions runs on every push to `main` and `dev`, and on all pull requests:

```
.github/workflows/ci.yml

Steps:
  1. Install dependencies (pnpm --frozen-lockfile)
  2. Type check (tsc --noEmit)
  3. Lint (eslint)
  4. Build (next build)
```

The build step validates the complete production output, including static generation of all posts and tag pages.

---

## Deployment Workflow

```
Developer                   GitHub Actions              Vercel
────────                    ──────────────              ──────
git push feat/xxx           
    │                       
    ▼                       
PR opened          →        CI runs (type + lint + build)
    │                       
    ▼                       
PR merged to main  →        CI runs again   →   Production deploy
    │                                           ─ calaos.me updated
    ▼
Preview URL available from Vercel bot comment on PR
```

---

## Publishing a New Post

Posts are published via the Git workflow:

```bash
# Create the post
cp src/content/posts/template.mdx src/content/posts/your-slug.mdx

# Edit and set published: true in frontmatter
# Push to main (or via PR)
git add src/content/posts/your-slug.mdx
git commit -m "content: add post 'Your Title'"
git push origin main

# Vercel auto-deploys in ~60 seconds
```

---

## Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| LCP | < 1.5s |
| CLS | 0 |
| FID / INP | < 100ms |

The static-first architecture (SSG + CDN) ensures LCP is served from the edge without any server processing latency.
