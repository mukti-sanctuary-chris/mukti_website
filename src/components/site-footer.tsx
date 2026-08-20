import Link from "next/link";
import { Mail, PawPrint } from "lucide-react";

import { siteConfig } from "@/lib/data/site-config";
import { InstagramIcon, FacebookIcon } from "@/components/icons/social";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <span className="flex items-center gap-2 font-serif text-lg">
            <PawPrint className="h-5 w-5 text-secondary" aria-hidden />
            {siteConfig.name}
          </span>
          <p className="max-w-xs text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Explore
          </span>
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/80 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Connect
          </span>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground"
          >
            <Mail className="h-4 w-4" /> {siteConfig.email}
          </a>
          <div className="flex items-center gap-4 pt-1">
            <a
              href={siteConfig.social.instagram}
              aria-label="Instagram"
              className="text-foreground/70 hover:text-foreground"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.facebook}
              aria-label="Facebook"
              className="text-foreground/70 hover:text-foreground"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.legalName}. All rights
        reserved. Built with care in {siteConfig.country}.
      </div>
    </footer>
  );
}
