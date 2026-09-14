import type { Image } from "sanity";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { animalsQuery } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";

import { animals as fallbackAnimals, type Animal } from "./animals";

/** Shape of each row returned by animalsQuery — kept in sync with that
 * GROQ projection by hand, since generating this from Sanity's typegen
 * requires a live/introspectable project that doesn't exist until the
 * one-time setup in README.md's "Content management" section is done. */
interface SanityAnimalResult {
  _id: string;
  name: string;
  slug: string | null;
  species: string;
  status: Animal["status"];
  bio: string | null;
  years: string | null;
  photo: Image | null;
}

/**
 * The single place every page reads animal content from. Returns Sanity's
 * live data when it's configured (see README.md's "Content management"
 * section), or the static list in ./animals.ts otherwise — so the site
 * works today and upgrades to live-editable content with no code changes
 * once Sanity is set up.
 *
 * Tagged "animal" and revalidated on a 60s timer as a safety net, but in
 * practice updates show up immediately: saving in Studio hits
 * /api/revalidate, which busts this tag on the spot (see that route and
 * README.md for the one-time webhook setup).
 */
export async function getAnimals(): Promise<Animal[]> {
  if (!client || !isSanityConfigured) return fallbackAnimals;

  try {
    const results = await client.fetch<SanityAnimalResult[]>(
      animalsQuery,
      {},
      { next: { revalidate: 60, tags: ["animal"] } },
    );

    return results.map(
      (result): Animal => ({
        slug: result.slug ?? result._id,
        name: result.name,
        species: result.species,
        status: result.status,
        bio: result.bio ?? "",
        years: result.years ?? undefined,
        // Neutral placeholder color for any animal added in Studio before
        // it has a photo — the sanctuary-brand PlaceholderImage swatches
        // in ./animals.ts don't apply to content that didn't come from
        // that file.
        color: "#8a8f7c",
        photoUrl: urlForImage(result.photo),
      }),
    );
  } catch (error) {
    // Sanity being briefly unreachable shouldn't take the whole site
    // down — fall back to the static roster instead of throwing.
    console.error(
      "Failed to fetch animals from Sanity, falling back to static data:",
      error,
    );
    return fallbackAnimals;
  }
}
