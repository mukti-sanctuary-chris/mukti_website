// Reads Sanity project config from environment variables rather than
// hardcoding it, so this repo works with whichever Sanity project gets
// created for the sanctuary — see README.md's "Content management" section
// for how to get these three values and where to set them (locally in
// .env.local, and in Vercel's project settings for the live site).
//
// Nothing here throws if the env vars are missing. `isSanityConfigured`
// lets the rest of the app fall back to the static data in
// src/lib/data/animals.ts until Sanity is actually wired up, so the site
// keeps working exactly as it does today in the meantime.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const isSanityConfigured = Boolean(projectId);

// Shared secret Sanity's webhook sends back to /api/revalidate so that
// route can tell a real Sanity webhook from a random request. Generate
// any long random string for this — see README.md.
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET || "";
