import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

// `null` until NEXT_PUBLIC_SANITY_PROJECT_ID is set — callers (see
// ../data.ts) check isSanityConfigured and fall back to the static data in
// src/lib/data/animals.ts instead of touching this.
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Published, non-draft content only — Beth doesn't currently use
      // Studio's draft/publish distinction, so every save goes live.
      perspective: "published",
      // useCdn:false hits the live API directly instead of Sanity's cached
      // CDN. Traffic here is small enough that this costs nothing, and it
      // removes a second layer of caching (on top of Next.js's own, which
      // /api/revalidate already busts instantly on save) that could
      // otherwise make an update take up to a minute to show up.
      useCdn: false,
    })
  : null;
