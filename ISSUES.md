# Known placeholders → GitHub issues

I don't have GitHub write access from this environment (no `gh` CLI, no
GitHub connector), and this repo isn't pushed to GitHub yet — so I can't
file these directly. Once you've pushed the repo, paste each block below
into "New issue" (title first line, rest is the body), or run:

```bash
gh issue create --title "TITLE" --body "BODY" --label "content"
```

---

### Write real founder bios for Team page

Beth Crivelli and Lynsey Clayton are listed on `/team`
(`src/lib/data/animals.ts` → `teamMembers`) with placeholder bios and
"Founder" as a generic role. Replace with their real bios, and confirm the
title each of them wants shown (e.g. "Co-Founder", "Founder & Director",
etc).

Also double-check the spelling of "Lynsey" — pulled from the GoFundMe
campaign page, not confirmed directly.

---

### Replace placeholder animal roster with real residents

`src/lib/data/animals.ts` → `animals` currently has four invented
placeholder entries (one pigeon, one cat, one dog, one farm animal) so the
Home and Team pages have realistic layouts. Replace with the sanctuary's
actual residents: real names, species, sponsorship status, and bios.

---

### Add real photography

Every image on the site is a `PlaceholderImage` gradient swatch
(`src/components/placeholder-image.tsx`). Once photos are approved, drop
them in `/public` and swap each `PlaceholderImage` usage for `next/image`.

---

### Confirm bank transfer details

`src/lib/data/site-config.ts` → `donation.bank` has a placeholder IBAN
(`PT50 0000...`) and BIC. Replace with the sanctuary's real account details
before the Direct Bank Transfer card goes live.

---

### Point "Shop our merchandise" at the real shop

`src/app/ways-to-help/page.tsx` currently links to
`https://muktisanctuary.com` (the existing Shopify store) as an interim.
Update once merch has a home on the new site, or confirm that external
link is the intended long-term destination.

---

### Add real "In Memory" tributes

`src/lib/data/memorials.ts` is intentionally empty — this is a memorial
page for real animals, so no invented entries were added. Add real
tributes once the sanctuary is ready to share them.

---

### Confirm production domain

`src/lib/data/site-config.ts` → `url` and `metadataBase` in
`src/app/layout.tsx` assume `https://muktisanctuary.com` as the final
domain. Confirm before launch — this feeds the sitemap, robots.txt, and
Open Graph tags.
