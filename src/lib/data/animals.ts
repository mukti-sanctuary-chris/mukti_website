// Placeholder rescue-animal data. This shape maps 1:1 onto a future
// Supabase `animals` table (see README) — swap this static array for a
// Supabase query without touching the components that consume it.

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
    slug: "bruno",
    name: "Bruno",
    species: "Donkey",
    status: "sponsorable",
    bio: "Rescued from neglect in 2022, Bruno now spends his days grazing the north pasture and greeting volunteers at the gate.",
    color: "#c9a877",
  },
  {
    slug: "luna",
    name: "Luna",
    species: "Dog",
    status: "resident",
    bio: "Luna arrived as a stray with a badly healed leg fracture. After surgery and months of rehab, she's the sanctuary's most enthusiastic greeter.",
    color: "#8a6a52",
  },
  {
    slug: "olive",
    name: "Olive",
    species: "Goat",
    status: "sponsorable",
    bio: "Olive was surrendered by a petting zoo that closed down. She's now the self-appointed leader of the goat herd.",
    color: "#a3ab7c",
  },
  {
    slug: "pip",
    name: "Pip",
    species: "Pig",
    status: "resident",
    bio: "Pip was rescued as a piglet from a backyard breeding operation. He loves mud baths and belly rubs, in that order.",
    color: "#c98a8a",
  },
];

export const teamMembers = [
  {
    slug: "founder",
    name: "Founder & Director",
    role: "Founder & Director",
    bio: "Leads day-to-day operations, rescue intake, and long-term care planning for every resident of the sanctuary.",
  },
  {
    slug: "vet-lead",
    name: "Lead Veterinary Coordinator",
    role: "Veterinary Coordinator",
    bio: "Coordinates medical care, rehabilitation plans, and partnerships with local veterinary clinics.",
  },
  {
    slug: "volunteer-coordinator",
    name: "Volunteer Coordinator",
    role: "Volunteer Coordinator",
    bio: "Organizes the sanctuary's volunteer program, visitor days, and community outreach.",
  },
];

export type TeamMember = (typeof teamMembers)[number];
