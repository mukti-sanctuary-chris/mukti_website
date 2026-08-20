# Mukti Sanctuary — Website

Custom Next.js site replacing the Shopify store, built for speed, a
refined visual identity, and zero-fee donation processing.

This is a **scaffold**: every page is real and production-buildable, but
copy, photography, and payment links are placeholders. The checklist below
is everything left to make it launch-ready.

## Stack

- **Framework**: Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling**: Tailwind CSS v4 + hand-rolled shadcn/ui-style primitives
  (`src/components/ui`)
- **Motion**: Framer Motion is installed and ready for page transitions /
  scroll reveals (not yet wired into the placeholder pages — add it where
  it earns its keep)
- **Content**: typed static data in `src/lib/data/*` — structured to map
  directly onto Supabase tables later (see below)
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
| `/` | Home — hero, donation CTA (Stripe + IBAN), Guardian sponsorship section |
| `/team` | Meet the Team — animal residents + human staff |
| `/ways-to-help` | Non-monetary ways to help (volunteer, share, wishlist, merch) |
| `/in-memory` | Memorial page for animals who have passed |

## What to plug in before launch

1. **Photography** — every image is a `PlaceholderImage` gradient swatch
   (`src/components/placeholder-image.tsx`). Drop real photos into
   `/public`, swap each `PlaceholderImage` for `next/image`, and remove
   the component once it's unused.
2. **Real content** — edit `src/lib/data/animals.ts`,
   `src/lib/data/memorials.ts`, and `src/lib/data/site-config.ts` with
   the sanctuary's actual animals, team bios, and org details.
3. **Donation links** — `src/lib/data/site-config.ts` → `donation`:
   - `stripeOneTimeLink` / `stripeMonthlyLink`: create Stripe Payment
     Links from the Stripe Dashboard (Product catalog → Payment links).
     Stripe doesn't charge platform fees on top of standard card
     processing for non-profits the way marketplaces like Shopify do —
     confirm current rates at stripe.com/pricing.
   - `zeffyLink`: Zeffy is purpose-built for non-profits and charges
     literally 0% (donors are prompted to add an optional tip that
     covers Zeffy's costs). Create a donation form in the Zeffy
     dashboard and paste the URL here.
   - `bank.iban` / `bank.bic` / `bank.accountName`: the sanctuary's real
     IBAN for direct SEPA transfers.
4. **Domain & fonts** — the scaffold ships on system fonts so the build
   never depends on reaching Google Fonts (useful in sandboxed CI). Once
   you're building somewhere with network access, you can restore
   `next/font/google` (Inter + Fraunces are already referenced as the
   intended pairing in `globals.css`) or self-host with `next/font/local`
   for the best of both — no runtime font request, real Google fonts.
5. **Analytics / SEO** — `metadataBase` in `src/app/layout.tsx` and the
   `url` in `site-config.ts` are set to `https://muktisanctuary.com`;
   confirm that's the final domain. `sitemap.ts` and `robots.ts` are
   already wired up.

## Content layer → Supabase migration path

`src/lib/data/animals.ts`, `memorials.ts`, etc. export typed arrays. To
move to Supabase later:

1. Create tables matching the existing `Animal`, `TeamMember`, and
   `Memorial` types (see each file).
2. Replace the static export with a Supabase query (e.g. in a Server
   Component: `const { data } = await supabase.from("animals").select()`).
3. Components (`AnimalCard`, the grids on `/team` and `/`) don't need to
   change — they consume the same shape either way.

This keeps the site fully static and free to host today, with a clear
upgrade path once content updates need to happen without a redeploy.

## Performance & SEO notes

- Every route in this scaffold prerenders to static HTML
  (`npm run build` shows `○ (Static)` for all pages) — this is the
  biggest lever for the mobile PageSpeed score the current Shopify site
  is missing.
- No client-side JS ships beyond small interactive islands (`"use client"`
  is only on the nav toggle and the copy-to-clipboard IBAN fields).
- Once real photos are added, serve them through `next/image` (already
  used for the pattern — just swap `PlaceholderImage`) so they're
  automatically resized, lazy-loaded, and served as modern formats.
- Re-run https://pagespeed.web.dev against the deployed preview before
  launch and address anything it flags — the biggest wins for a Shopify
  → static-Next.js migration are almost always image weight and
  render-blocking third-party scripts, both of which this scaffold
  avoids by default.

## Deployment

Either Vercel or Cloudflare Pages will work well; Vercel has the
simplest zero-config path for Next.js:

```bash
npx vercel
```

Connect the GitHub repo in the Vercel dashboard for automatic deploys on
every push to `main`.
