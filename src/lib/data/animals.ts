// Static fallback roster — pulled from the "Meet The Team!" page on the
// current site (muktisanctuary.com/pages/contact); names and short bios
// come from that page's own photo captions/alt text. Photos are still
// PlaceholderImage swatches (see GitHub issue #3, on hold) until real
// photography is picked back up.
//
// This is no longer the live source of truth: src/lib/data/get-animals.ts
// reads from Sanity (see README.md's "Content management" section) and
// only falls back to this file if Sanity isn't configured yet, or is
// briefly unreachable. Keeping the same shape here means that fallback is
// seamless — every page just calls getAnimals() and doesn't care which
// source answered.
//
// Status vocabulary matches the four statuses Beth edits in Studio:
// "rescued" (recently arrived, still settling in), "permanent-resident",
// "adopted", and "in-memory". The mapping below from the site's old
// two-tier "resident"/"sponsorable" language is a best-effort guess —
// dogs, Bugsy, and other animals without a specific Stripe sponsorship
// tier are marked "permanent-resident"; animals that had a "Sponsor a
// Cat"/"Sponsor a Pigeon" tier are marked "rescued". Beth should correct
// any of these that are wrong the first time she's in Studio — this file
// (and scripts/migrate-to-sanity.mjs, which seeds Sanity from it) only
// needs to get the roster roughly right, not perfectly.

export type AnimalStatus =
  | "rescued"
  | "permanent-resident"
  | "adopted"
  | "in-memory";

export const statusLabel: Record<AnimalStatus, string> = {
  rescued: "Rescued",
  "permanent-resident": "Permanent resident",
  adopted: "Adopted",
  "in-memory": "In loving memory",
};

export type Animal = {
  slug: string;
  name: string;
  species: string;
  status: AnimalStatus;
  bio: string;
  color: string; // placeholder swatch, used until a real photo is set
  years?: string; // e.g. "2015–2023" — only meaningful for "in-memory"
  photoUrl?: string; // set when the animal's photo came from Sanity
};

export const animals: Animal[] = [
  {
    slug: "bow",
    name: "Bow",
    species: "Dog",
    status: "permanent-resident",
    bio: "A fox-colored mixed-breed dog with a bit of chihuahua in the mix.",
    color: "#c9a877",
  },
  {
    slug: "jonty",
    name: "Jonty",
    species: "Dog",
    status: "permanent-resident",
    bio: "A blonde mixed-breed dog with a bit of corgi influence.",
    color: "#c9a877",
  },
  {
    slug: "ruxy",
    name: "Ruxy",
    species: "Dog",
    status: "permanent-resident",
    bio: "An infatuating greyhound.",
    color: "#c9a877",
  },
  {
    slug: "karamella",
    name: "Karamella",
    species: "Cat",
    status: "rescued",
    bio: "An adorable orange cat.",
    color: "#c98a4a",
  },
  {
    slug: "timo",
    name: "Timo",
    species: "Cat",
    status: "rescued",
    bio: "A pitch black, beautiful cat.",
    color: "#4a4a4a",
  },
  {
    slug: "paco",
    name: "Paco",
    species: "Cat",
    status: "rescued",
    bio: "An adorable snowshoe siamese.",
    color: "#8a8f7c",
  },
  {
    slug: "mokhi",
    name: "Mokhi",
    species: "Cat",
    status: "rescued",
    bio: "An orange cat cutey.",
    color: "#c98a4a",
  },
  {
    slug: "nino",
    name: "Niño",
    species: "Cat",
    status: "rescued",
    bio: "A cat with distinctive facial markings.",
    color: "#8a6a52",
  },
  {
    slug: "kimchi",
    name: "Kimchi",
    species: "Cat",
    status: "rescued",
    bio: "A gorgeous siamese cross.",
    color: "#8a8f7c",
  },
  {
    slug: "bugsy",
    name: "Bugsy",
    species: "Rabbit",
    status: "permanent-resident",
    bio: "A gorgeous white and brown bunny.",
    color: "#c9a877",
  },
  {
    slug: "goji",
    name: "Goji",
    species: "Cat",
    status: "rescued",
    bio: "An adorable black cat with brownish spots.",
    color: "#4a4a4a",
  },
  {
    slug: "kari",
    name: "Kari",
    species: "Cat",
    status: "rescued",
    bio: "A beautiful black and white cat.",
    color: "#5c5c50",
  },
  {
    slug: "pigeon-representative",
    name: "Pigeon Representative",
    species: "Pigeon",
    status: "rescued",
    bio: "A gorgeous urban pigeon, standing in for the flock of urban pigeons the sanctuary looks out for.",
    color: "#8a8f7c",
  },
  {
    slug: "capuccio",
    name: "Capuccio",
    species: "Cat",
    status: "rescued",
    bio: "A gorgeous dark gray cat.",
    color: "#5c5c50",
  },
  {
    slug: "obsidian",
    name: "Obsidian",
    species: "Cat",
    status: "rescued",
    bio: "A beautiful pitch black cat.",
    color: "#4a4a4a",
  },
  {
    slug: "dobee",
    name: "Dobee",
    species: "Cat",
    status: "rescued",
    bio: "A beautiful black and white cat.",
    color: "#5c5c50",
  },
];

// Human team — same "no longer the live source of truth" caveat as
// `animals` above: src/lib/data/get-team.ts reads the "person" document
// type from Sanity and only falls back to this list if Sanity isn't
// configured or briefly unreachable.
//
// Real founder: Beth Crivelli. Bio is a placeholder — see GitHub issue #1
// — replace with her actual bio and photo.
//
// Lynsey Clayton was previously removed from this list (2026-09-07 note:
// "Lynsey is not a founder, take her off the website for now"). Per
// direct confirmation from Christian Crivelli (2026-09-24), that's no
// longer the case — she's back on, alongside Christian, Marco, and Nuno,
// all under the generic "Team member" title for now. Update titles and
// bios as the sanctuary provides real text/photos.
export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photoUrl?: string; // set when the person's photo came from Sanity
};

export const teamMembers: TeamMember[] = [
  {
    slug: "beth-crivelli",
    name: "Beth Crivelli",
    role: "Founder",
    bio: "Placeholder bio — replace with Beth's real bio.",
  },
  {
    slug: "christian-crivelli",
    name: "Christian Crivelli",
    role: "Team member",
    bio: "Placeholder bio — replace with Christian's real bio.",
  },
  {
    slug: "lyndsey-clayton",
    name: "Lyndsey Clayton",
    role: "Team member",
    bio: "Placeholder bio — replace with Lyndsey's real bio.",
  },
  {
    slug: "marco",
    name: "Marco",
    role: "Team member",
    bio: "Placeholder bio — replace with Marco's real bio.",
  },
  {
    slug: "nuno",
    name: "Nuno",
    role: "Team member",
    bio: "Placeholder bio — replace with Nuno's real bio.",
  },
];
