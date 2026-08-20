// Central place for org-level facts. Replace placeholder values with the
// sanctuary's real details before launch (legal name, IBAN, links, etc).

export const siteConfig = {
  name: "Mukti Sanctuary",
  legalName: "Mukti Sanctuary — Associação",
  tagline: "A safe home for animals with nowhere else to go.",
  description:
    "Mukti Sanctuary is a Portuguese non-profit animal sanctuary providing lifelong care, rescue, and rehabilitation for animals in need.",
  url: "https://muktisanctuary.com",
  country: "Portugal",
  email: "hello@muktisanctuary.com",
  social: {
    instagram: "https://instagram.com/muktisanctuary",
    facebook: "https://facebook.com/muktisanctuary",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Meet the Team", href: "/team" },
    { label: "Ways to Help", href: "/ways-to-help" },
    { label: "In Memory", href: "/in-memory" },
  ],
  donation: {
    // Replace with the sanctuary's live Stripe Payment Link and/or
    // Zeffy campaign URL. Stripe Payment Links look like:
    // https://donate.stripe.com/xxxxxxxx
    stripeOneTimeLink: "https://donate.stripe.com/REPLACE_ME",
    stripeMonthlyLink: "https://donate.stripe.com/REPLACE_ME_MONTHLY",
    zeffyLink: "https://www.zeffy.com/en-US/donation-form/REPLACE_ME",
    bank: {
      accountName: "Mukti Sanctuary — Associação",
      iban: "PT50 0000 0000 0000 0000 0000 0",
      bic: "REPLACE_ME_BIC",
      bankName: "Replace with bank name",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
