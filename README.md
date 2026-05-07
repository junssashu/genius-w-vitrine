# GENIUS.W — Maison de Couture

Editorial vitrine site for **GENIUS.W**, the haute-couture / prêt-à-porter atelier
of Junius Wabo, Yaoundé. Built as a contemporary fashion-house showcase with a
journal, portfolio, FAQ and contact channel — bilingual French/English with an
adaptive light/dark/auto theme.

## Stack

- **Next.js 16** (App Router, Turbopack, Server Components by default)
- **TypeScript** strict
- **Tailwind v4** (theme-token CSS variables)
- **Framer Motion** for interaction-driven motion
- **Lenis** for smooth wheel scroll
- **lucide-react** + custom inline SVG iconography
- Cookie-based preferences (theme · language · name) read server-side via
  `next/headers` for accurate first paint

## Quick start

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build (27 routes)
npm start
```

## What's inside

```
src/
├── app/              # App-router routes (all SSR, cookie-aware)
│   ├── page.tsx              · Home
│   ├── a-propos/             · About
│   ├── services/             · Four ateliers / crafts
│   ├── portfolio/            · Look gallery + dynamic [slug]
│   ├── temoignages/          · Client voices
│   ├── blog/                 · Journal + dynamic [slug] (likes + comments)
│   ├── faq/                  · Accordion + FAQ JSON-LD
│   ├── contact/              · Bilingual form
│   ├── mentions-legales/     · Bilingual legal page
│   ├── sitemap.ts · robots.ts · manifest.ts
│   └── layout.tsx            · Root: PreferencesProvider, JSON-LD, Nav, Footer
├── components/
│   ├── ui/           · 25+ reusable primitives (Button, Section, PageHeader,
│   │                   Reveal, Parallax, ScrollScale, TiltCard, Magnetic,
│   │                   SplitText, LineDraw, Counter, Marquee, WordStrip,
│   │                   ProgressiveMotif, SmartImage, Logo, SocialLinks…)
│   ├── layout/       · Nav, MobileNavPanel, Footer, Cursor, SmoothScroll,
│   │                   GreetingBanner, JsonLd, ThemeToggle, LangToggle
│   ├── home/         · Hero, Manifesto, ServicesPreview, WordBand,
│   │                   CinemaStatement, HorizontalPortfolio, …
│   ├── portfolio/    · LookCard, LookGrid
│   ├── blog/         · PostCard, LikeButton, Comments, ArticleJsonLd
│   ├── testimonials/ · TestimonialCard
│   ├── faq/          · FaqAccordion, FaqItem
│   ├── contact/      · ContactForm
│   ├── providers/    · PreferencesProvider, ThemeScript
│   └── a11y/         · SkipLink, KeyboardNav (Alt+Arrow inter-page nav)
├── lib/              # Pure data / helpers (one type per file)
│   ├── brand.ts · nav.ts · services.ts · portfolio.ts
│   ├── posts.ts · testimonials.ts · faqs.ts
│   ├── i18n/         · types · fr · en · dictionaries · greetings · server
│   ├── server-prefs.ts · cookies.ts · locale.ts · timezone.ts · time.ts
│   ├── bandwidth.ts · use-bandwidth.ts · lqip.ts · cn.ts
└── middleware.ts     # Sets `gw_lang` cookie from Accept-Language
```

## Architecture rules

- **Server Components by default.** `"use client"` only for hooks /
  Framer Motion / Lenis / `usePreferences`.
- **Data layer** = one file per domain in `src/lib/`, fully typed `as const`,
  no `any`.
- **Reusable UI** in `src/components/ui/`. CTAs go through `<Button variant>`,
  sections through `<Section>` + `<SectionHeader>` / `<PageHeader>`.
- **Design tokens** are CSS custom properties in `globals.css`
  (`--ink`, `--ivory`, `--gold`, `--gold-bright`, `--wine`, `--smoke`, `--line`).
  Light theme flips them under `[data-theme="light"]`. Components consume via
  Tailwind theme inline (`bg-ivory`, `text-gold-bright`, `border-line`).
- **Typography classes** are `.t-display`, `.t-1`, `.t-2`, `.t-3` (NOT
  `.h-*` — collides with Tailwind's height utilities).
- **No magic strings/numbers** — extract named constants per file.
- **File ceiling 200 lines** (target ≤ 150).

## Preferences

A single `<PreferencesProvider>` carries:

| state        | source                                            | persistence            |
| ------------ | ------------------------------------------------- | ---------------------- |
| theme        | `auto / light / dark` (auto resolves on hour)     | `gw_theme` cookie + LS |
| language     | `fr / en` (Accept-Language → cookie on first hit) | `gw_lang` cookie + LS  |
| visitor name | captured from contact / comment forms             | `gw_name` cookie       |
| timezone, hr | `Intl.DateTimeFormat()`                           | runtime                |

An inline `<ThemeScript>` runs in `<head>` to set `data-theme` and
`<html lang>` before hydration → no FOUC, no flash of wrong language.
`router.refresh()` on language toggle re-renders SSR with the new dict.

## Effects vocabulary

Compose, don't reinvent: `Reveal`, `Parallax`, `ScrollScale`, `TiltCard`,
`Magnetic`, `SplitText`, `LineDraw`, `Counter`, `Marquee`, `WordStrip`,
`ProgressiveMotif`. The custom cursor reads `data-cursor="view"` to show the
bilingual "Voir / View" pill — apply it to media tiles, not text links.

## SEO

- `metadataBase` set globally; per-route `generateMetadata` reads the cookie
  and emits the right title / description / OG locale (`fr_FR` ⇄ `en_GB`).
- JSON-LD: `Organization` + `WebSite` in the layout, `Article` per blog post,
  `FAQPage` on the FAQ route.
- `app/sitemap.ts` covers every dynamic slug; `app/robots.ts` allows all bots.
- Cross-link strips at the bottom of each page so any crawl entry-point reaches
  the rest of the site in one hop.

## Accessibility

- `lang` attribute follows the cookie / Accept-Language.
- Skip-to-content link, focus-visible gold outline, semantic landmarks
  (`header`, `nav`, `main`, `article`, `aside`, `footer`).
- `aria-current` on nav, `aria-expanded`/`aria-controls` on accordion + mobile
  menu, `aria-pressed` on like/lang buttons, `aria-live="polite"` on the
  comments list and greeting banner.
- **Alt + ←/→** keyboard shortcut moves between top-level pages.
- Every motion primitive honours `prefers-reduced-motion`.

## Performance

- Inline SVG only today (zero raster weight). Real photos route through
  `<SmartImage>` (bandwidth-aware quality + LQIP placeholder).
- `next/font` with `display: swap` for Italiana + Cormorant Garamond + Manrope.
- `optimizePackageImports` on `lucide-react` and `framer-motion`.
- Routes render dynamically (`ƒ`) because the root layout reads cookies for
  per-visitor first paint — acceptable for a vitrine with low write traffic.

## Notes

- Likes & comments are stored in `localStorage` (per-device). Wire to a
  backend when needed — both components are isolated behind a
  `useLocalStorage` hook so it's a one-file swap.
- Long-form editorial copy (service descriptions, blog post bodies, FAQ
  answers, testimonial quotes, look descriptions) stays French. Translating
  couture prose needs a copywriter; the dictionary in `src/lib/i18n/` is
  ready to be extended when those translations exist.

## License

© 2026 GENIUS.W — Junius Wabo. All rights reserved.
