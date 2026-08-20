// Placeholder "In Memory" entries — animals who lived out their lives at
// the sanctuary. Maps to a future Supabase `memorials` table.

export type Memorial = {
  slug: string;
  name: string;
  species: string;
  years: string;
  tribute: string;
  color: string;
};

export const memorials: Memorial[] = [
  {
    slug: "hazel",
    name: "Hazel",
    species: "Donkey",
    years: "2009 – 2024",
    tribute:
      "Hazel was among the sanctuary's very first residents. For fifteen years she welcomed every new arrival with quiet patience. She is deeply missed.",
    color: "#b79a72",
  },
  {
    slug: "walnut",
    name: "Walnut",
    species: "Goose",
    years: "2015 – 2023",
    tribute:
      "Walnut ruled the pond with unmatched confidence and an even louder honk. The pond has been quieter without him.",
    color: "#9aa887",
  },
];
