import type { Metadata } from "next";
import { Aleo, Figtree } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${aleo.variable} ${figtree.variable}`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
