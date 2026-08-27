// Central place for org-level facts. Sourced from muktisanctuary.com, the
// sanctuary's GoFundMe campaign, and the Linktree as of Aug 2026 — confirm
// with the team before launch, especially the bank details below, which are
// still a placeholder.

export const siteConfig = {
  name: "Mukti Sanctuary",
  legalName: "Mukti Sanctuary",
  tagline: "A safe space for animals — and people — with nowhere else to go.",
  description:
    "Mukti Sanctuary is a regenerative space in Portugal where humans, animals, and nature coexist in harmony — rescuing and rehabilitating dogs, cats, pigeons, and farm animals while supporting the local community.",
  url: "https://muktisanctuary.com",
  country: "Portugal",
  // Currently operating out of a temporary facility in Santo António da
  // Charneca while raising funds to buy permanent land in the Greater
  // Lisbon area (Mafra / Torres Vedras / Loures).
  location: "Santo António da Charneca, Portugal",
  email: "hello@muktisanctuary.com",
  social: {
    instagram: "https://www.instagram.com/mukti.sanctuary",
    facebook: "https://www.facebook.com/muktisanctuary",
    youtube: "https://www.youtube.com/@muktisanctuary",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Meet the Team", href: "/team" },
    { label: "Ways to Help", href: "/ways-to-help" },
    { label: "In Memory", href: "/in-memory" },
  ],
  donation: {
    // The sanctuary's active land-purchase campaign — currently the most
    // important CTA on the site. Don't hardcode the raised amount here;
    // it goes stale immediately. Link out and let GoFundMe show live
    // progress.
    gofundmeLink: "https://www.gofundme.com/f/muktisanctuary",
    // Real monthly sponsorship tiers, pulled from the sanctuary's
    // Linktree. Add more as new Stripe Payment Links are created.
    // (Deliberately not called "Guardian" — on the sanctuary's own site
    // that word means the person who adopts/cares for a rescued animal,
    // not a donor tier, so reusing it here would be confusing. See
    // GitHub issue #12.)
    sponsorshipTiers: [
      {
        label: "Sponsor a Pigeon",
        amounts: [
          { amount: "€3/mo", href: "https://donate.stripe.com/eVq00j9xJ18laro0V60Fi04" },
          { amount: "€5/mo", href: "https://donate.stripe.com/5kQeVdh0b2cpczw1Za0Fi03" },
          { amount: "€10/mo", href: "https://donate.stripe.com/fZufZh5ht6sFdDA5bm0Fi05" },
        ],
      },
      {
        label: "Sponsor a Cat",
        amounts: [
          { amount: "€5/mo", href: "https://donate.stripe.com/7sYcN55htcR3aro33e0Fi0a" },
          { amount: "€10/mo", href: "https://donate.stripe.com/00w6oHh0bg3f0QOcDO0Fi0b" },
          { amount: "€15/mo", href: "https://donate.stripe.com/8x23cv7pB2cpdDAbzK0Fi0c" },
        ],
      },
    ],
    // TODO: confirm the sanctuary's real IBAN — this is still a
    // placeholder and should not go live as-is.
    bank: {
      accountName: "Mukti Sanctuary",
      iban: "PT50 0000 0000 0000 0000 0000 0",
      bic: "REPLACE_ME_BIC",
      bankName: "Replace with bank name",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
