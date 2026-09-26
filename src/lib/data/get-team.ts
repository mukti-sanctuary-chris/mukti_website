import type { Image } from "sanity";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { teamQuery } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";

import { teamMembers as fallbackTeamMembers, type TeamMember } from "./animals";

/** Shape of each row returned by teamQuery — kept in sync with that GROQ
 * projection by hand, same reasoning as SanityAnimalResult in
 * get-animals.ts. */
interface SanityPersonResult {
  _id: string;
  name: string;
  slug: string | null;
  role: string;
  bio: string | null;
  photo: Image | null;
}

/**
 * The single place every page reads human-team content from. Mirrors
 * getAnimals() in get-animals.ts: returns Sanity's live "person" documents
 * when configured, or the static list in ./animals.ts otherwise.
 *
 * Tagged "person" and revalidated on a 60s timer as a safety net — same
 * instant-update-via-webhook behavior as animals, see get-animals.ts and
 * README.md's "Content management" section.
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!client || !isSanityConfigured) return fallbackTeamMembers;

  try {
    const results = await client.fetch<SanityPersonResult[]>(
      teamQuery,
      {},
      { next: { revalidate: 60, tags: ["person"] } },
    );

    return results.map(
      (result): TeamMember => ({
        slug: result.slug ?? result._id,
        name: result.name,
        role: result.role,
        bio: result.bio ?? "",
        photoUrl: urlForImage(result.photo),
      }),
    );
  } catch (error) {
    // Sanity being briefly unreachable shouldn't take the whole site
    // down — fall back to the static roster instead of throwing.
    console.error(
      "Failed to fetch team members from Sanity, falling back to static data:",
      error,
    );
    return fallbackTeamMembers;
  }
}
