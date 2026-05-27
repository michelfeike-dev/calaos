# Contributing

## Branch Strategy

```
main          → production (auto-deploys to Vercel)
dev           → integration branch
feat/*        → feature branches  → PR to dev
fix/*         → bug fixes         → PR to main + dev
content/*     → new posts         → PR to main (skips dev)
```

### Rules

- Never commit directly to `main`
- PRs to `main` require passing CI
- `feat/*` branches should be short-lived (< 1 week)
- Squash-merge feature branches to keep main history clean

---

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

Types:
  feat     New feature
  fix      Bug fix
  style    CSS/styling changes with no logic change
  refactor Code change that neither fixes a bug nor adds a feature
  content  New post or post update
  chore    Dependency updates, config changes, tooling
  docs     Documentation only changes
```

Examples:

```
feat: add newsletter subscription form
fix: prevent hydration mismatch in ThemeToggle
content: add post "The Grid as Language"
style: increase body line-height to 1.8
chore: upgrade next to 16.3
```

---

## Development Setup

```bash
# Prerequisites: Node.js 20+, pnpm 11+
pnpm install
cp .env.example .env.local
# Fill in .env.local values

pnpm dev
```

## Code Standards

**TypeScript:** Strict mode enabled. No `any`, no type assertions without comment explaining why.

**Imports:** Use `@/` alias for all internal imports. Never use relative `../` paths across feature boundaries.

**Components:** One component per file. Named exports only (no default exports for components).

**CSS:** Use design token CSS variables. No hardcoded color values. No inline styles except for dynamic values.

**Comments:** Only when the *why* is non-obvious. No comments explaining what the code does.

---

## Adding a New Post

1. Create `src/content/posts/your-slug.mdx`
2. Fill in frontmatter (all fields required except `featured` and `coverImage`)
3. Write content in MDX
4. Test locally: `pnpm dev`
5. Open PR to `main` with type `content:`

---

## Adding a New Component

1. Identify correct directory:
   - `src/components/blog/` — blog-specific UI
   - `src/components/layout/` — site chrome
   - `src/components/mdx/` — available inside MDX files
   - `src/components/shared/` — cross-feature
   - `src/components/ui/` — shadcn primitives only
2. Named export, typed props, no `any`
3. Use CSS variables for colors/transitions
4. Export from appropriate barrel if one exists

---

## PR Template

```markdown
## What

<!-- What does this PR change? -->

## Why

<!-- Why is this change needed? -->

## Checklist

- [ ] TypeScript passes (`pnpm type-check`)
- [ ] Build succeeds (`pnpm build`)
- [ ] No new hardcoded colors (uses CSS variables)
- [ ] Tested on mobile width (375px)
```
