# Mukti Sanctuary — Website

Mukti Sanctuary is a Portuguese non-profit animal rescue, currently based
in Santo António da Charneca and raising funds for permanent land in
Greater Lisbon. This repository is the sanctuary's website
(`muktisanctuary.com`), rebuilt from the ground up as a fast, custom site
rather than a subscription storefront — no recurring SaaS fee eats into
donations, and every design and technical decision was made with a small
non-profit's actual needs in mind: donors need to trust the site, the
sanctuary's small team needs to update it without a developer, and
visitors' data needs to be treated carefully.

## What's on the site

| Page | What it's for |
|---|---|
| Home | The sanctuary's mission, and the main ways to give: a land-fund campaign, monthly sponsorship tiers, and direct bank transfer |
| Meet the Team | The animals currently in care, grouped by status (recently rescued, permanent resident, or adopted), plus the humans running the sanctuary |
| Ways to Help | Non-monetary ways to get involved — volunteering, sharing the sanctuary's story, wishlist donations |
| In Memory | A memorial page for animals who have passed away in the sanctuary's care |
| Privacy Policy | A plain-language explanation of what data the site collects (see below) |

## Data protection & privacy

The site was built to collect as little visitor data as possible, and to
be transparent about what little it does:

- **No tracking or advertising scripts.** Nothing on the site profiles
  visitors, serves ads, or sells data — there's no analytics package
  installed at all yet, and if one is ever added it'll be a
  privacy-respecting one disclosed in the Privacy Policy first.
- **No third-party font requests.** The site's fonts are downloaded once
  at build time and served from the sanctuary's own domain, rather than
  loading them live from Google's servers on every visit. That avoids
  quietly sharing every visitor's IP address with a third party just to
  render text — a practice a 2022 German court ruling found unlawful
  under GDPR.
- **No cookies beyond what's strictly necessary** to run the site itself.
- **A real Privacy Policy** (`/privacy`) written for this specific site,
  not boilerplate — it says plainly what is and isn't collected.
- **Accessible by design.** The site follows WCAG 2.1 AA — proper heading
  structure, sufficient color contrast, keyboard navigation, skip-to-
  content links, and screen-reader support — both because it's the right
  thing to do and because Portugal's Decreto-Lei n.º 82/2023 sets digital
  accessibility expectations that a public-facing charity site should
  meet regardless of whether it's strictly obligated to.

These choices matter for a charity in particular: supporters and grant
reviewers increasingly expect an organisation to handle data as carefully
as it handles donations, and a slow, tracking-heavy, or inaccessible site
undermines that trust before a visitor even reads the mission statement.

## Keeping content current

Animal profiles — name, species, status, a short bio, and a photo — are
kept up to date by the sanctuary's own team through a private content
editor, with no code changes or developer involvement needed for routine
updates like a new rescue, a status change, or an adoption. If a status
isn't set yet in the editor, the site quietly falls back to its last-known
data rather than showing something broken.

## Technical overview

- **Framework**: Next.js 16 (App Router, TypeScript, Turbopack) — every
  page prerenders to static HTML for speed.
- **Styling**: Tailwind CSS v4 with hand-rolled UI primitives
  (`src/components/ui`), no third-party design-system dependency.
- **Content**: a typed content layer (`src/lib/data/`) backed by a
  headless CMS for the animal roster, with the CMS-editable data flowing
  through `src/lib/data/get-animals.ts` so every page reads from one
  place.
- **Payments**: GoFundMe (land-fund campaign) and Stripe Payment Links
  (monthly sponsorship tiers) — no in-house payment processing or card
  data touches this codebase.
- **Icons**: `lucide-react`, with a few brand social icons as small inline
  SVGs (`src/components/icons/social.tsx`).

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

## Known gaps (tracked as GitHub issues)

- **#1** — real bios for the founders (Beth & Lynsey), plus confirm the
  spelling of "Lynsey"
- **#3** — real photography to replace the placeholder image swatches
- **#4** — the sanctuary's real bank IBAN / BIC (`site-config.ts` still
  has placeholders)
- **#6** — real In Memory tributes, once the sanctuary is ready to share
  them

Only close one of these issues when the underlying thing is actually
done — if it's blocked on info only the sanctuary has, leave it open with
a comment explaining the blocker rather than closing it as "deferred."

## Performance & SEO notes

- Every route in this site prerenders to static HTML (`npm run build`
  shows `○ (Static)` for all pages) — this is the biggest lever for the
  mobile PageSpeed score the old Shopify site was missing.
- No client-side JS ships beyond small interactive islands (`"use client"`
  is only on the copy-to-clipboard IBAN fields).
- Once real photos are added, they're served through `next/image` so
  they're automatically resized, lazy-loaded, and served as modern
  formats.
- Re-run https://pagespeed.web.dev against the deployed site and address
  anything it flags — the biggest wins for a Shopify → static-Next.js
  migration are almost always image weight and render-blocking
  third-party scripts, both of which this site avoids by default.

## Deployment

Deployed on Vercel, connected to this GitHub repo for automatic deploys
on every push to `main`. Domain: `muktisanctuary.com`.
