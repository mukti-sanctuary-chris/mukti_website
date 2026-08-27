// "In Memory" entries — animals who lived out their lives at the
// sanctuary. Intentionally empty: this is a memorial page for real animals,
// so it should never carry invented tributes. Add real entries here once
// the sanctuary shares them. Maps to a future Supabase `memorials` table.

export type Memorial = {
  slug: string;
  name: string;
  species: string;
  years: string;
  tribute: string;
  color: string;
};

export const memorials: Memorial[] = [];
