import type { Metadata } from "next";
import { Aleo, Figtree } from "next/font/google";
import "./globals.css";

import { SiteChrome } from "@/components/site-chrome";
import { siteConfig } from "@/lib/data/site-config";

// Fonts: Aleo (body) + Figtree (headings) — matches the real
// muktisanctuary.com site (captured via computed styles, see GitHub issue
// #8).
//
// Loaded via next/font/google rather than a <link> to fonts.googleapis.com.
// next/font downloads the font files once at BUILD time and self-hosts them
// as static assets on our own domain — visitors' browsers never contact
// Google's servers, so no visitor IP address is shared with Google on page
// load. A plain Google Fonts <link> does that on every visit with no
// consent prompt, which a 2022 Munich court ruling (and the wave of GDPR
// claims that followed it) found unlawful. This trades a one-time
// build-time dependency on Google Fonts being reachable for removing a
// per-visitor privacy issue — the right trade for an EU-facing site.
// globals.css keeps its system-font fallback stacks in case a font ever
// fails to load.
const aleo = Aleo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-aleo",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    // Only real image asset in the repo — see public/brand/mukti-logo.png.
    // metadataBase above resolves this to an absolute URL automatically.
    images: [
      {
        url: "/brand/mukti-logo.png",
        width: 512,
        height: 512,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/brand/mukti-logo.png"],
  },
};

// Organization structured data (schema.org JSON-LD) — lets search engines
// and AI assistants resolve "Mukti Sanctuary" as a known entity with a
// canonical URL, logo, and verified social profiles, instead of guessing
// from page text alone. Every field below is sourced directly from
// site-config.ts; nothing here is invented. Plain inline <script> rather
// than a Next-specific helper, since this checkout is on Next 16.3.5 and
// node_modules/next/dist/docs/ (the version-specific API docs AGENTS.md
// points to) isn't present on this machine to confirm a newer API exists.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/mukti-logo.png`,
  description: siteConfig.description,
  email: siteConfig.email,
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.youtube,
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${aleo.variable} ${figtree.variable}`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- static, trusted JSON we built above, not user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
