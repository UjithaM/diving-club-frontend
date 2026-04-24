# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev        # start dev server (Next.js Turbopack default)
pnpm build      # production build
pnpm start      # serve production build
pnpm lint       # run ESLint (flat config, next/core-web-vitals + typescript rules)
```

No test runner is configured.

## Stack

- **Next.js 16.2.4** — App Router (`/app` dir at root, no `/src`). APIs differ from older versions; read `node_modules/next/dist/docs/` before writing routing, metadata, or data-fetching code.
- **React 19** + **TypeScript 5** (strict mode, path alias `@/*` → root)
- **Tailwind CSS v4** — configured inline via `globals.css` using `@import "tailwindcss"` and `@theme`. No separate `tailwind.config.js`. Add custom tokens inside the `@theme` block in `globals.css`.
- **pnpm** (workspace)

## Architecture

```
/app
  layout.tsx      ← root layout; metadata API lives here
  page.tsx        ← home route
  globals.css     ← Tailwind v4 theme + global styles
/public           ← static assets
```

Metadata is exported as `const metadata: Metadata` from `layout.tsx` (and per-page files). No `<Head>` component — that is the old pattern.

## SEO — Primary Concern

SEO is the top priority on every page and piece of content. Follow these rules without exception:

1. **Every page exports typed `Metadata`** — title (50–60 chars), description (150–160 chars), canonical URL, Open Graph image, Twitter card.
2. **Structured data (JSON-LD)** — add relevant Schema.org types (e.g. `LocalBusiness`, `TouristAttraction`, `Product`, `Review`, `FAQPage`) as `<script type="application/ld+json">` in page components.
3. **Semantic HTML** — one `<h1>` per page, logical heading hierarchy, descriptive `alt` text on all images.
4. **Core Web Vitals** — use `next/image` (with `width`/`height` or `fill`), `next/font`, and `priority` on above-the-fold images. Avoid layout shift.
5. **`sitemap.xml` and `robots.txt`** — generate via Next.js App Router file conventions (`app/sitemap.ts`, `app/robots.ts`).
6. **Internal linking** — anchor text must be descriptive; no "click here".
7. **Performance** — lazy-load below-the-fold images; minimize client components.

## Content Rules

- **Humanize every piece of copy** — write in a warm, conversational tone. Avoid AI-sounding phrases ("delve into", "leverage", "ensure"). Write like a friendly local dive guide talking to a first-time visitor.
- **Keyword-first structure** — primary keyword near the start of titles and first paragraph. Support with natural long-tail variants.
- **E-E-A-T signals** — cite experience, location specifics, and local knowledge to build trust.

## Business Identity

| Field    | Value |
|----------|-------|
| Name     | Diving Club |
| Category | Diving center |
| Address  | 74/9, Sandy Cove, 31000, Trincomalee, Sri Lanka |
| Phone    | 0743945010 |

## Design System — Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Warm White | `#FFF8F0` | Primary background |
| Sunrise | `#F4A261` | Warm accent |
| Tropic Coral | `#E76F51` | Hero / CTA pop |
| Charcoal Sea | `#264653` | Navy / primary text |
| Shallow Water | `#2A9D8F` | Teal / secondary accent |

Define these inside `globals.css` `@theme` block as CSS custom properties (e.g. `--color-warm-white: #FFF8F0;`) so they are available as Tailwind utilities (`bg-warm-white`, `text-charcoal-sea`, etc.).
