// Real resident roster, pulled from the "Meet The Team!" page on the
// current site (muktisanctuary.com/pages/contact) — names and the short
// bios below come from that page's own photo captions/alt text. Photos
// themselves are still PlaceholderImage swatches (see GitHub issue #3,
// on hold for now) — swap in real photography when that's picked back up.
// This shape maps 1:1 onto a future Supabase `animals` table (see README).
//
// Sponsorship status follows the sanctuary's real Stripe sponsorship tiers
// (Linktree only has "Sponsor a Pigeon" and "Sponsor a Cat" — no per-dog or
// per-rabbit tier exists yet), so dogs and Bugsy are marked "resident".
// (Deliberately not calling these tiers "Guardian" — see GitHub issue #12:
// on the sanctuary's own site that word refers to an adopter/caretaker,
// not a donor tier.)

export type Animal = {
  slug: string;
  name: string;
  species: string;
  status: "resident" | "sponsorable" | "adoptable";
  bio: string;
  color: string; // placeholder swatch until real photography is in place
};

export const animals: Animal[] = [
  {
    slug: "bow",
    name: "Bow",
    species: "Dog",
    status: "resident",
    bio: "A fox-colored mixed-breed dog with a bit of chihuahua in the mix.",
    color: "#c9a877",
  },
  {
    slug: "jonty",
    name: "Jonty",
    species: "Dog",
    status: "resident",
    bio: "A blonde mixed-breed dog with a bit of corgi influence.",
    color: "#c9a877",
  },
  {
    slug: "ruxy",
    name: "Ruxy",
    species: "Dog",
    status: "resident",
    bio: "An infatuating greyhound.",
    color: "#c9a877",
  },
  {
    slug: "karamella",
    name: "Karamella",
    species: "Cat",
    status: "sponsorable",
    bio: "An adorable orange cat.",
    color: "#c98a4a",
  },
  {
    slug: "timo",
    name: "Timo",
    species: "Cat",
    status: "sponsorable",
    bio: "A pitch black, beautiful cat.",
    color: "#4a4a4a",
  },
  {
    slug: "paco",
    name: "Paco",
    species: "Cat",
    status: "sponsorable",
    bio: "An adorable snowshoe siamese.",
    color: "#8a8f7c",
  },
  {
    slug: "mokhi",
    name: "Mokhi",
    species: "Cat",
    status: "sponsorable",
    bio: "An orange cat cutey.",
    color: "#c98a4a",
  },
  {
    slug: "nino",
    name: "Niño",
    species: "Cat",
    status: "sponsorable",
    bio: "A cat with distinctive facial markings.",
    color: "#8a6a52",
  },
  {
    slug: "kimchi",
    name: "Kimchi",
    species: "Cat",
    status: "sponsorable",
    bio: "A gorgeous siamese cross.",
    color: "#8a8f7c",
  },
  {
    slug: "bugsy",
    name: "Bugsy",
    species: "Rabbit",
    status: "resident",
    bio: "A gorgeous white and brown bunny.",
    color: "#c9a877",
  },
  {
    slug: "goji",
    name: "Goji",
    species: "Cat",
    status: "sponsorable",
    bio: "An adorable black cat with brownish spots.",
    color: "#4a4a4a",
  },
  {
    slug: "kari",
    name: "Kari",
    species: "Cat",
    status: "sponsorable",
    bio: "A beautiful black and white cat.",
    color: "#5c5c50",
  },
  {
    slug: "pigeon-representative",
    name: "Pigeon Representative",
    species: "Pigeon",
    status: "sponsorable",
    bio: "A gorgeous urban pigeon, standing in for the flock of urban pigeons the sanctuary looks out for.",
    color: "#8a8f7c",
  },
  {
    slug: "capuccio",
    name: "Capuccio",
    species: "Cat",
    status: "sponsorable",
    bio: "A gorgeous dark gray cat.",
    color: "#5c5c50",
  },
  {
    slug: "obsidian",
    name: "Obsidian",
    species: "Cat",
    status: "sponsorable",
    bio: "A beautiful pitch black cat.",
    color: "#4a4a4a",
  },
  {
    slug: "dobee",
    name: "Dobee",
    species: "Cat",
    status: "sponsorable",
    bio: "A beautiful black and white cat.",
    color: "#5c5c50",
  },
];

// Real founders: Beth Crivelli and Lynsey Clayton. Bios are placeholders —
// see GitHub issue "Write real founder bios for Team page" — replace with
// the actual bios and photos each of them wants shown.
//
// NOTE: double-check the spelling of "Lynsey" before launch — the GoFundMe
// campaign page spells it this way, but confirm directly with her.
export const teamMembers = [
  {
    slug: "beth-crivelli",
    name: "Beth Crivelli",
    role: "Founder",
    bio: "Placeholder bio — replace with Beth's real bio.",
  },
  {
    slug: "lynsey-clayton",
    name: "Lynsey Clayton",
    role: "Founder",
    bio: "Placeholder bio — replace with Lynsey's real bio.",
  },
];

export type TeamMember = (typeof teamMembers)[number];
