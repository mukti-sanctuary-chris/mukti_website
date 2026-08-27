# Mukti Sanctuary — Website

Custom Next.js site replacing the Shopify store at muktisanctuary.com,
built for speed, a real donation flow, and no recurring SaaS fees.

## Stack

- **Framework**: Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling**: Tailwind CSS v4 + hand-rolled shadcn/ui-style primitives
  (`src/components/ui`)
- **Fonts**: Aleo (body) + Figtree (headings), matched to the real
  muktisanctuary.com's computed styles, loaded via a `<link>` to Google
  Fonts in `src/app/layout.tsx` (not `next/font/google`, so the build
  never depends on reaching Google Fonts) — see `src/app/globals.css` for
  full system-font fallbacks.
- **Content**: typed static data in `src/lib/data/*` — structured to map
  directly onto Supabase tables later (see below). Supabase itself is
  deliberately not wired in yet; there's no non-technical content-editing
  need that justifies the added complexity so far.
- **Payments**: GoFundMe (land-fund campaign) + Stripe Payment Links
  (monthly sponsorship tiers) — no in-house payment processing.
- **Icons**: `lucide-react` (note: this major version dropped brand
  logos like Instagram/Facebook; those live as small inline SVGs in
  `src/components/icons/social.tsx`)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, donation CTA (GoFundMe + Stripe tiers + bank transfer), residents teaser |
| `/team` | Meet the Team — the real animal residents + human staff (Beth Crivelli, Lynsey Clayton) |
| `/ways-to-help` | Non-monetary ways to help (volunteer, share, wishlist) |
| `/in-memory` | Memorial page for animals who have passed — intentionally empty until the sanctuary shares real tributes |

## Content layer

- `src/lib/data/site-config.ts` — org-level facts: name, tagline, socials,
  nav, and the `donation` block (GoFundMe link, Stripe sponsorship tiers,
  bank transfer details).
- `src/lib/data/animals.ts` — the real resident roster and human team,
  sourced from the current live site's "Meet The Team!" page.
- `src/lib/data/memorials.ts` — empty on purpose; this is a memorial page
  for real animals, so no content was invented for it.

Every image is still a `PlaceholderImage` gradient swatch
(`src/components/placeholder-image.tsx`) pending real photography.

## Known gaps (tracked as GitHub issues)

- **#1** — real bios for the founders (Beth & Lynsey), plus confirm the
  spelling of "Lynsey"
- **#3** — real photography to replace the `PlaceholderImage` swatches
- **#4** — the sanctuary's real bank IBAN / BIC (`site-config.ts` still
  has placeholders)
- **#6** — real In Memory tributes, once the sanctuary is ready to share
  them

Only close one of these issues when the underlying thing is actually
done — if it's blocked on info only the sanctuary has, leave it open with
a comment explaining the blocker rather than closing it as "deferred."

## Content layer → Supabase migration path

`src/lib/data/animals.ts`, `memorials.ts`, etc. export typed arrays. To
move to Supabase later:

1. Create tables matching the existing `Animal`, `TeamMember`, and
   `Memorial` types (see each file).
2. Replace the static export with a Supabase query (e.g. in a Server
   Component: `const { data } = await supabase.from("animals").select()`).
3. Components (the grids on `/team` and `/`) don't need to change — they
   consume the same shape either way.

This keeps the site fully static and free to host today, with a clear
upgrade path once content updates need to happen without a redeploy.

## Performance & SEO notes

- Every route in this site prerenders to static HTML (`npm run build`
  shows `○ (Static)` for all pages) — this is the biggest lever for the
  mobile PageSpeed score the old Shopify site was missing.
- No client-side JS ships beyond small interactive islands (`"use client"`
  is only on the copy-to-clipboard IBAN fields).
- Once real photos are added, serve them through `next/image` so they're
  automatically resized, lazy-loaded, and served as modern formats.
- Re-run https://pagespeed.web.dev against the deployed site and address
  anything it flags — the biggest wins for a Shopify → static-Next.js
  migration are almost always image weight and render-blocking
  third-party scripts, both of which this site avoids by default.

## Deployment

Deployed on Vercel, connected to this GitHub repo for automatic deploys
on every push to `main`. Domain: `muktisanctuary.com`.
