# Design System

## Principles

1. **Restraint over decoration** — every element earns its place
2. **Typography-first** — layout serves the text, not the reverse
3. **Dark-first** — the default experience is dark; light is an override
4. **Consistent tokens** — no magic values; everything references a CSS variable

---

## Color Tokens

All colors are defined as CSS custom properties in `src/app/globals.css` and toggled via `.dark` class (next-themes).

### Dark Mode (default)

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#0a0a0a` | Page background |
| `--bg-elevated` | `#111111` | Card, code block backgrounds |
| `--bg-subtle` | `#1a1a1a` | Hover states, tag backgrounds |
| `--bg-muted` | `#222222` | Dividers |
| `--text-primary` | `#f0f0f0` | Headlines, strong text |
| `--text-secondary` | `#c0c0c0` | Body text |
| `--text-muted` | `#888888` | Dates, captions, labels |
| `--text-faint` | `#333333` | Decorative separators |
| `--accent-vivid` | `#c9b99a` | Links, highlights, active states |
| `--accent-subtle` | `#6b5c4a` | Secondary accent |
| `--border` | `#222222` | Default borders |
| `--border-strong` | `#333333` | Emphasized borders |

### Light Mode

| Token | Value |
|---|---|
| `--bg-base` | `#fafaf9` |
| `--bg-elevated` | `#ffffff` |
| `--bg-subtle` | `#eeeeec` |
| `--text-primary` | `#111111` |
| `--text-secondary` | `#444444` |
| `--accent-vivid` | `#6b5c4a` |
| `--border` | `#e0e0de` |

### Using in Tailwind

Tokens are exposed as Tailwind utilities via `@theme inline`:

```html
<div class="bg-bg-elevated text-text-primary border border-border">
```

Or use CSS variables directly for complex values:

```html
<div style={{ color: 'var(--accent-vivid)' }}>
```

---

## Typography

### Fonts

| Role | Font | Variable |
|---|---|---|
| Body / UI | Geist (Vercel) | `--font-geist-sans` |
| Code | Geist Mono | `--font-geist-mono` |
| Display / Headings | Instrument Serif | `--font-instrument-serif` |

All loaded via `next/font/google` — zero layout shift, self-hosted on Vercel's CDN.

### Type Scale (Major Third — 1.25×)

| Step | Size | Usage |
|---|---|---|
| `text-xs` | 12px | Tags, captions, legal |
| `text-sm` | 14px | UI labels, metadata |
| `text-base` | 16px | Body text |
| `text-lg` | 20px | Lead paragraphs |
| `text-xl` | 25px | — |
| `text-2xl` | 31px | — |
| `text-3xl` | 39px | Section headings |
| `text-4xl` | 49px | Page titles |
| `text-5xl` | 61px | Hero headlines |

### Prose Settings

```css
max-width: 65ch;     /* Optimal reading line length */
line-height: 1.8;    /* Generous leading for body */
color: var(--text-secondary);
```

### Heading Style

Display headings use `font-display` (Instrument Serif), `font-weight: 400`, `letter-spacing: -0.02em`. This intentional use of a thin-weight serif creates an editorial, premium feel without appearing heavy.

---

## Spacing

8-point base grid. All spacing values are multiples of 4px or 8px.

| Value | px |
|---|---|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-24` | 96px |

---

## Layout

**Max content width:** `max-w-3xl` (48rem / 768px) — narrow enough to enforce good measure, wide enough for comfortable reading on large screens.

**Page padding:** `px-6` (24px) — comfortable mobile margins.

**Navigation height:** `h-14` (56px) — sticky header.

---

## Components

### PostCard

Two variants:
- **Default** — horizontal layout with title, description excerpt, date, and tags. Used in list views.
- **Featured** — vertical, large typography. Used for the hero post.

### TagBadge

Pill label. With `href` prop renders as a link to the tag page. Without `href` renders as a static `<span>`.

### Callout

Contextual block with icon. Four types: `info`, `warning`, `success`, `error`. Available as a custom MDX component.

```mdx
<Callout type="warning" title="Optional title">
  Your message here.
</Callout>
```

### TableOfContents

Uses `IntersectionObserver` to track which heading is currently in viewport. Sticky sidebar on `xl` screens (1280px+), not visible on smaller screens.

---

## Animation

Animations are intentional, rare, and fast.

| Type | Duration | Easing |
|---|---|---|
| Hover state | 150ms | `ease` |
| Entrance fade | 400ms | `ease-out` |
| Theme transition | Disabled | `disableTransitionOnChange` |

**No scroll-triggered animations in v1.** Entrance animations on page load only. Respect `prefers-reduced-motion` via `useReducedMotion()` if adding Framer Motion entrance animations.

---

## Dark Mode

Implemented with `next-themes`:
- Default: `dark`
- `enableSystem: true` — respects OS preference on first visit
- `disableTransitionOnChange: true` — prevents flash of unstyled content on theme switch
- Stored in `localStorage`

The `ThemeToggle` component is mounted client-side with a `mounted` guard to prevent hydration mismatch.
