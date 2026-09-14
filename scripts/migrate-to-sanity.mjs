#!/usr/bin/env node
// One-time import of src/lib/data/animals.ts into Sanity, so Beth starts
// from the current real roster instead of an empty Studio. Safe to run
// more than once — it upserts by a deterministic _id, so re-running just
// updates the same documents rather than duplicating them (any changes
// Beth already made in Studio to those same animals would be overwritten,
// though, so this is really meant to be run once, right after the Sanity
// project is first created).
//
// Usage (see README.md's "Content management" section for the env vars):
//   SANITY_API_WRITE_TOKEN=... node scripts/migrate-to-sanity.mjs
//
// Does NOT import photos — animals.ts only has placeholder swatch colors,
// not real photos, so there's nothing to migrate there. Add each animal's
// real photo afterwards directly in Studio.

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.\n" +
      "See README.md's \"Content management\" section for where to get these.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

// Inlined rather than imported from src/lib/data/animals.ts so this plain
// Node script doesn't need the project's TypeScript/path-alias setup.
const animals = [
  { slug: "bow", name: "Bow", species: "Dog", status: "permanent-resident", bio: "A fox-colored mixed-breed dog with a bit of chihuahua in the mix." },
  { slug: "jonty", name: "Jonty", species: "Dog", status: "permanent-resident", bio: "A blonde mixed-breed dog with a bit of corgi influence." },
  { slug: "ruxy", name: "Ruxy", species: "Dog", status: "permanent-resident", bio: "An infatuating greyhound." },
  { slug: "karamella", name: "Karamella", species: "Cat", status: "rescued", bio: "An adorable orange cat." },
  { slug: "timo", name: "Timo", species: "Cat", status: "rescued", bio: "A pitch black, beautiful cat." },
  { slug: "paco", name: "Paco", species: "Cat", status: "rescued", bio: "An adorable snowshoe siamese." },
  { slug: "mokhi", name: "Mokhi", species: "Cat", status: "rescued", bio: "An orange cat cutey." },
  { slug: "nino", name: "Niño", species: "Cat", status: "rescued", bio: "A cat with distinctive facial markings." },
  { slug: "kimchi", name: "Kimchi", species: "Cat", status: "rescued", bio: "A gorgeous siamese cross." },
  { slug: "bugsy", name: "Bugsy", species: "Rabbit", status: "permanent-resident", bio: "A gorgeous white and brown bunny." },
  { slug: "goji", name: "Goji", species: "Cat", status: "rescued", bio: "An adorable black cat with brownish spots." },
  { slug: "kari", name: "Kari", species: "Cat", status: "rescued", bio: "A beautiful black and white cat." },
  { slug: "pigeon-representative", name: "Pigeon Representative", species: "Pigeon", status: "rescued", bio: "A gorgeous urban pigeon, standing in for the flock of urban pigeons the sanctuary looks out for." },
  { slug: "capuccio", name: "Capuccio", species: "Cat", status: "rescued", bio: "A gorgeous dark gray cat." },
  { slug: "obsidian", name: "Obsidian", species: "Cat", status: "rescued", bio: "A beautiful pitch black cat." },
  { slug: "dobee", name: "Dobee", species: "Cat", status: "rescued", bio: "A beautiful black and white cat." },
];

const transaction = client.transaction();

for (const animal of animals) {
  transaction.createOrReplace({
    _id: `animal-${animal.slug}`,
    _type: "animal",
    name: animal.name,
    slug: { _type: "slug", current: animal.slug },
    species: animal.species,
    status: animal.status,
    bio: animal.bio,
  });
}

const result = await transaction.commit();
console.log(`Imported ${result.results.length} animals into Sanity.`);
console.log(
  "Every status was mapped as a best guess (see the comment at the top " +
    "of src/lib/data/animals.ts) — Beth should double-check each one in " +
    "Studio, and add real photos while she's there.",
);
