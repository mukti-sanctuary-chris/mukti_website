"use client";

import { usePathname } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/**
 * Wraps every page with the site's skip-link, header, and footer — except
 * /studio, which is Sanity's own full-screen editing UI (see
 * src/app/studio/[[...tool]]/page.tsx) and needs to render with none of
 * that site chrome around it. Kept as one small client component reading
 * the current pathname, rather than moving every marketing page into a
 * separate route group with its own layout — same result, smaller diff.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio") ?? false;

  if (isStudio) {
    return <div className="flex-1">{children}</div>;
  }

  return (
    <>
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
    </>
  );
}
