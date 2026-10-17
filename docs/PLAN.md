# Aravia — build plan (step 1)

Status: plan approved; step 2 complete. Coverage widened to the Arab world (see §0).

---

## 0. Coverage: the Arab world

Grouped everywhere (navigation, destinations, filters) as three regions:

| Region | Countries | Destinations |
|---|---|---|
| **The Gulf** | Saudi Arabia, United Arab Emirates, Qatar, Kuwait, Bahrain, Oman | AlUla and Hegra, Red Sea islands, Riyadh and Diriyah, Jeddah's Al-Balad · Dubai, Abu Dhabi, Ras Al Khaimah's desert · Doha · Kuwait City, Failaka Island · Manama · Muscat, Musandam, Wahiba Sands, Jebel Akhdar |
| **The Levant** | Jordan | Petra, Wadi Rum, the Dead Sea, Aqaba |
| **North Africa** | Egypt, Morocco, Tunisia, Algeria | Cairo and the Pyramids, Luxor and the Nile, the Red Sea · Marrakech, Fes, the Atlas, Merzouga, Essaouira, Chefchaouen · Tunis and Sidi Bou Said, Carthage, El Djem, Djerba, Tozeur · Algiers and the Casbah, Timgad and Djémila, Tassili n'Ajjer and Djanet |

11 countries, 36 destinations. Seed data in `/data`: 27 Season events, 29 composer places, 62 legs, 13 curated routes,
entry notes and etiquette for every country. Every date, route, leg and entry rule carries `verify: true`.

---

## 1. Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router, React 19, TypeScript strict) | Brief; static generation for every content page |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) | Tokens live in one file, mirrored from `/config/brand.ts` |
| Motion | Framer Motion (`motion/react`) | Slow fades, parallax; `useReducedMotion` everywhere |
| Fonts | `next/font/google` — **Cormorant Garamond** (display, high contrast) + **Jost** (body, refined geometric sans) | Self-hosted at build, no runtime Google requests (privacy) |
| Journal | MDX files in `/content/journal`, compiled with `next-mdx-remote/rsc` + typed frontmatter | Posts are files, not code |
| Images | `next/image`; placeholder art as local SVG/AVIF "plates" until photography is supplied | No hotlinking stock sites; no third-party requests |
| Analytics | None by default; a `config.analytics` slot for a privacy-friendly provider (Plausible / Vercel Web Analytics, cookieless) | Discretion promise |
| Hosting | Vercel | Already connected |

No chat widgets, no tag managers, no cookie banner needed (no non-essential cookies set).

## 2. Design system

### Palette (tokens)
| Token | Hex | Use |
|---|---|---|
| `midnight-950` | `#0B0E1F` | Page background |
| `midnight-900` | `#12162E` | Surfaces |
| `midnight-800` | `#1B2142` | Raised surfaces, inputs |
| `midnight-700` | `#2A315A` | Borders, lattice lines at rest |
| `sand-300` | `#E3CFA8` | Secondary headings, highlights |
| `sand-500` | `#C9AE7E` | Muted accents |
| `rose-400` | `#C98F7E` | Petra rose stone — tags, small emphasis |
| `rose-600` | `#9C6656` | Rose on light |
| `brass-400` | `#C8A35F` | **The accent**: the one action, focus rings, lattice on hover |
| `brass-600` | `#9E7C3F` | Brass pressed / on light |
| `ivory-50` | `#F6F1E7` | Body text |
| `ivory-300` | `#CFC7B8` | Secondary text |

All text pairs checked to WCAG AA (ivory-50 on midnight-950 ≈ 16:1; ivory-300 ≈ 10:1; brass-400 ≈ 8:1).
Dark only — the brand is night; no light theme.

### Type
- Display: Cormorant Garamond 300/500, uppercase eyebrows with `tracking-[0.3em]`, headings in sentence case with `tracking-[0.04em]`.
- Body: Jost 300/400, 17–18px base, 1.7 line-height, max ~68ch.
- Fluid scale with `clamp()`: eyebrow 12px → h1 48–88px.

### Mashrabiya motif (`components/motif/`)
- `<LatticeRule />` — thin horizontal divider: 1px line broken by a small repeated eight-point geometric node (inline SVG, `currentColor`).
- `<LatticeFrame />` — corner brackets built from the same geometry, framing images and cards.
- `<LatticeHover />` — a hairline lattice pattern (SVG `<pattern>`) that fades in at 8–12% opacity on card hover/focus.
- `<StarMark />` — the logo's small eight-point star (two overlaid squares), also used as list bullets.
Never used as full-page wallpaper; at most one lattice element per viewport section.

### Motion
- `<Reveal>`: opacity 0→1, y 12→0, 1.2s, ease `[0.22, 1, 0.36, 1]`, once, on enter.
- `<Parallax>`: hero/plate images drift ≤ 40px with scroll.
- Cycling placeholder in Ask Aravia: 4s hold, 0.8s crossfade.
- `prefers-reduced-motion`: all of the above become instant / static; cycling stops on the first example.

### Layout
Private-members'-club feel: 12-col grid, generous vertical rhythm (sections 128–192px desktop), narrow text columns,
**one brass primary action per screen** (always "Ask Aravia"); everything else is a quiet text link with a lattice underline.

## 3. Folder structure

```
/app
  /[locale]                     ← i18n segment (only "en" generated now)
    layout.tsx                  ← <html lang dir>, header, footer, AskAravia dialog provider
    page.tsx                    ← Home
    ask/page.tsx
    how-it-works/page.tsx
    services/page.tsx  services/[slug]/page.tsx
    destinations/page.tsx  destinations/[country]/page.tsx  destinations/[country]/[slug]/page.tsx
    season/page.tsx
    journey-composer/page.tsx
    travelling-with-grace/page.tsx  travelling-with-grace/[country]/page.tsx  travelling-with-grace/ramadan/page.tsx
    discretion/page.tsx
    about/page.tsx
    journal/page.tsx  journal/[slug]/page.tsx
    contact/page.tsx
    legal/[doc]/page.tsx        ← terms, privacy-policy, cookies
  /api/requests/route.ts        ← POST: validate, log, TODO CRM + WhatsApp
  sitemap.ts  robots.ts  opengraph-image.tsx  not-found.tsx
/middleware.ts (proxy)           ← redirects "/" → "/en" (later: Accept-Language)
/config
  brand.ts                      ← name, promise, contact (WhatsApp, email), licence placeholders, socials (none), analytics slot
  site.ts                       ← nav structure, SEO defaults, base URL
  i18n.ts                       ← locales: en (active); ar (rtl), fr, de (prepared, disabled)
  ramadan.ts                    ← Ramadan / Eid dates per year, flagged verifyYearly
/data
  types.ts                      ← all shared types (below)
  countries.ts  destinations.ts  services.ts  events.ts
  routes.ts  flight-times.ts  entry.ts  etiquette.ts
  concierges.ts  testimonials.ts  request-examples.ts
/content/journal/*.mdx           ← 4 starter posts
/dictionaries/en.ts              ← UI strings (buttons, labels, form copy) — content stays in /data
/components
  /layout  Header, Footer, Nav, MobileNav, SkipLink
  /motif   LatticeRule, LatticeFrame, LatticeHover, StarMark, Logo
  /motion  Reveal, Parallax
  /ask     AskAravia (field), AskDialog (channel chooser), useAsk (context to open pre-filled)
  /season  SeasonCalendar, EventCard, Filters
  /composer JourneyComposer, PlacePicker, RouteSummary
  /ui      Plate (image with frame), Section, Eyebrow, Prose, Placeholder badge, LinkArrow
/lib  i18n.ts, seo.ts, whatsapp.ts, composer.ts (route logic), season.ts (date helpers), mdx.ts
/public/plates/*.svg             ← temporary art-directed placeholder images
```

## 4. Data types

Source of truth: [`/data/types.ts`](../data/types.ts). Key points:
- `RegionId = 'gulf' | 'levant' | 'north-africa'`; `CountryCode` covers the 11 countries.
- `SeasonEvent` stores a typical month window (wrapping over the new year) and a human `timing` line, not fixed dates.
- `ComposerLeg`, `ComposerRoute`, `EntryNote`, `EtiquetteGuide`, `SeasonEvent` all extend `Verify` (`verify: true`).
- Composer place ids are a literal union, so routes and legs that name an unknown place fail to compile.
- Ramadan and Eid dates live in `/config/ramadan.ts`, flagged verify yearly.

## 5. Signature features — how they work

### 1. Ask Aravia
- `AskProvider` (client context) at the layout root exposes `openAsk(prefill, context)`. Every "Request access",
  "Have your concierge refine this" and destination/service CTA calls it.
- Hero: large single field. Header: compact "Ask Aravia" button that opens the same dialog (an accessible `<dialog>`, focus-trapped, Esc closes).
- Placeholder cycles through `request-examples.ts` (visual only; real `placeholder` attribute stays static for screen readers, the cycling text is `aria-hidden`).
- Submit → step 2 in the dialog: three equal choices.
  - **WhatsApp**: POST to API, then open `https://wa.me/<number>?text=<encoded request>`.
  - **Call back**: name, phone (with country code), preferred time → POST.
  - **Email**: name, email → POST; also offers a `mailto:` fallback.
- Confirmation: "Received. Your concierge will be in touch." No exclamation marks.
- `/api/requests` (Node runtime): zod validation, honeypot field + simple rate limit per IP (in-memory), `console.info` structured log,
  `// TODO: forward to CRM` and `// TODO: WhatsApp Business API` hooks. No PII in client-side storage.
- `/ask` page hosts the full-page version for direct links and no-JS fallback (plain `<form>` POST works without JavaScript).

### 2. The Season
- Server component loads `events.ts`; client `SeasonCalendar` renders a **month-by-month timeline** (Oct → Apr season first, then the rest)
  rather than a grid of empty days — more beautiful, works on mobile.
- Filters: country and type as toggle chips, synced to URL query (`?country=SA&type=motorsport`) so filtered views are shareable.
- Every card shows "Dates approximate — verify yearly" and a quiet "Request access" → `openAsk("Access to {event}, {year}", {source:'season'})`.
- Seed (27, all "verify"), across all three regions, e.g. F1 in Abu Dhabi, Saudi Arabia, Qatar and Bahrain; Riyadh Season; AlUla's winter festivals; Hala February (Kuwait); Abu Simbel Sun Festival; Marrakech film festival; Fes sacred music; Gnaoua in Essaouira; Festival of the Sahara in Douz; Carthage festival; Sebeïba in Djanet. Filters: region, country, type.

### 3. Journey Composer
- Pick 2–4 places from 29 composer places (chips grouped by region, then country).
- `lib/composer.ts`: if the selection matches a curated route in `routes.ts`, use its order; otherwise order by a
  nearest-neighbour pass from the westernmost/easternmost gateway (simple, deterministic, explained as "a suggested order").
- Legs: looked up in `flight-times.ts` (approx. minutes; scheduled vs private where relevant; e.g. Petra legs are via Amman/Aqaba + drive).
  Missing pairs fall back to a great-circle estimate labelled "approximate".
- Output: ordered route with leg times, nights per place (from `idealNights`), total suggested nights, best season (intersection of best months),
  entry note per country marked "Guidance only — verify before travel".
- CTA "Have your concierge refine this" → `openAsk("Dubai → AlUla → Petra, about 9 nights, in March", {source:'composer'})`.
- State in URL (`?places=dubai,alula,petra`) for sharing.

### 4. Travelling with grace
- Index page with a calm introduction; one page per country with the six sections; respectful framing ("what our guests find helpful", "as a guest").
- Ramadan page: what changes (hours, eating in public, quieter days, livelier nights), what's beautiful (iftar, suhoor, lanterns, generosity),
  how we plan around it; dates from `config/ramadan.ts` (2026 and 2027, flagged verify yearly) displayed with "expected, subject to moon sighting".

### 5. Discretion, by design
- Home section (three short lines) + `/discretion` page: never name clients, never post client photos, NDAs on request, concierge-only handling,
  and the site's own practice (no chat widgets, no advertising cookies, cookieless analytics if any, request data used only to reply).

## 6. Content placeholders & tone rules
- Every specific claim (private openings, exclusive access, partnerships, security staffing, licensed operations) carries `confirm: true`
  and is shown with a subtle `[to confirm]` marker **in preview/dev only** (`NEXT_PUBLIC_SHOW_PLACEHOLDERS`), so production can hide markers once you have confirmed, or leave them on until then. Default: **on**.
- Concierges and testimonials are marked placeholders.
- A content lint script (`npm run lint:copy`) fails the build on `!`, prices/currency symbols, and the banned words list.

## 7. SEO, accessibility, performance
- `generateMetadata` per page, canonical URLs, `hreflang` scaffolding, OpenGraph image generated per section, JSON-LD (`TravelAgency`, `Event`, `Article`, `BreadcrumbList`).
- `sitemap.ts`, `robots.ts`.
- Semantic landmarks, skip link, visible brass focus rings, keyboard-operable dialog/filters, 44px targets, alt text from data.
- Static generation for all pages; only the dialog, season filters and composer are client components. Target Lighthouse ≥ 95 across the board.

## 8. Build order (as briefed)
1. ✅ This plan.
2. Design system + layout shell (tokens, fonts, motif, header with Ask Aravia, footer).
3. Homepage + Ask Aravia + API route.
4. The Season, Journey Composer, etiquette + Ramadan, discretion.
5. Services, destinations, about, journal, contact, legal.
6. Polish: motion, a11y, SEO, Lighthouse.
7. Deploy to Vercel.

Each step is checked in the dev server (Playwright screenshots, desktop + mobile) and committed separately.

## 9. Things I need from you (can come later)
- WhatsApp number and email address (placeholders until then).
- Company name and licence numbers.
- Domain for canonical URLs.
- Photography (placeholder plates until supplied).
- Confirmation of every `[to confirm]` claim.
