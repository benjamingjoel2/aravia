# Aravia

Website for Aravia, a private travel concierge for the Arab world. *Ask, and consider it arranged.*

Site URL: https://aravia.tourground.com (set `NEXT_PUBLIC_SITE_URL` in Vercel).

## Run it

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /en (generates the FR/DE/ES copies first)
npm run build        # runs the copy check first, then a production build
npm run lint:copy    # tone-of-voice check on its own
npm run typecheck
npm run i18n:missing # strings with no translation, per language (add --list to print them)
npm run i18n:extract # write i18n/strings.json, every translatable string and where it is used
```

Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, MDX. Deployed on Vercel.

## Where things live

| What | Where |
|---|---|
| Brand name, promise, email, business address | `config/brand.ts` |
| Navigation, site URL, placeholder markers on/off | `config/site.ts` |
| Languages: English (source), French, German, Spanish; Arabic RTL prepared | `config/i18n.ts`, `i18n/{fr,de,es}.json`, `i18n/content/`, `scripts/i18n-build.mjs` |
| Ramadan and Eid dates | `config/ramadan.ts` |
| Countries and regions (The Gulf, The Levant, North Africa) | `data/countries.ts` |
| Destinations, and their page content | `data/destinations.ts`, `data/destination-details.ts` |
| Services | `data/services.ts` |
| The Season events | `data/events.ts` |
| Journey Composer places, travel times, routes, entry notes | `data/composer.ts` |
| Etiquette guide | `data/etiquette.ts` |
| Photography (Unsplash, no attribution needed, so no credits page) | `data/photos.ts`, `docs/photo-shortlist.md` |
| Journal posts | `content/journal/*.mdx` (add the import in `lib/journal.ts`) |
| Legal pages (booking terms, privacy, cookies) | `lib/legal.ts` |
| Request handling (Ask Aravia) | `app/api/requests/route.ts` |
| Design tokens and motif | `app/globals.css`, `components/motif/` |
| Design reference notes | `docs/design-references.md` |

## Languages

The site is in English, French, German and Spanish: `/en/...` (English, the source and `x-default`), `/fr/...`, `/de/...`, `/es/...`. Every page exists in all four and is pre-rendered; no translation code ships to the browser.

- English pages live in `app/en/`. Code reads the current language from `config/locale.ts` (`locale`), so links built with `localePath(locale, …)`, `<html lang>`, the canonical and hreflang tags follow automatically.
- `scripts/i18n-build.mjs` runs before `dev` and `build`. For each language it writes a translated copy of `app/en/` to `app/<locale>/` and of `components`, `lib`, `data`, `config`, `dictionaries` and `content` to `.i18n/<locale>/`, replacing English strings from `i18n/<locale>.json` (English text → translation; a `path::text` key overrides one file only). Journal posts come from `i18n/content/<locale>/journal/`. The generated folders are git-ignored; never edit them.
- When you change or add English copy, add the same key to `i18n/fr.json`, `i18n/de.json` and `i18n/es.json` (`npm run i18n:missing -- --list` shows what is missing; untranslated strings fall back to English). A file containing `i18n-skip-strings` is copied without translation (`config/i18n.ts`, `data/map.ts`).
- The language selector (EN · FR · DE · ES) is `components/layout/LanguageSelector.tsx`: in the header and the mobile menu, it links to the same page in the other language. There is no redirect by browser language.
- Parsing uses TypeScript 5 (dev dependency `typescript-parser`), because TypeScript 7 has no JavaScript compiler API.

## Before launch

**Details to confirm**
- [ ] Email is `aravia@tourground.com`; business address is The Executive Centre, One Central, Dubai World Trade Centre (owner-approved coworking arrangement). Confirm the exact level/suite with the centre.
- [ ] The site deliberately shows no phone numbers, WhatsApp, licence numbers, social links, team profiles or testimonials.
- [ ] Legal pages (`lib/legal.ts`, and their translations in `i18n/{fr,de,es}.json`) reviewed by a lawyer.
- [ ] French, German and Spanish copy read by a native speaker before launch (`i18n/*.json`, `i18n/content/`).

**Claims to confirm.** 42 specific claims (private openings, early entry, close protection, NDAs and similar) carry `confirm: true` and show a small "to confirm" marker. Confirm or remove each one. Once all are settled, set `NEXT_PUBLIC_SHOW_PLACEHOLDERS=false` to hide the markers.

**Placeholders to replace**
- [ ] The founding story paragraph on About

**Verify every year.** 130 items carry `verify: true`: every Season event, travel time, route, entry note and etiquette guide. Ramadan dates also need checking against the moon sighting.

**Photography**
- [ ] Replace illustrative photos with photos of the actual place where possible. They're labelled "Illustrative photograph" on the page, and assigned as `mood` in `data/destination-details.ts`.
- [ ] Add photography for destinations that currently show the typographic plate.

## Integrations still to connect

`app/api/requests/route.ts` validates and logs every request. TODOs mark where to connect:
- the CRM;
- email acknowledgements.

Until the CRM is connected, the Vercel function logs are the only copy of requests, and they contain personal details, so keep log retention short. The rate limit is per server instance; move it to a shared store if spam appears.

## Tone of voice

`npm run lint:copy` (also run before every build) fails on exclamation marks, prices or currency, and the phrases the brief rules out ("exotic", "hidden gem", "Arabian Nights" and so on). No prices appear anywhere on the site.
