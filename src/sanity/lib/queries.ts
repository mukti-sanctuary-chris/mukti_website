import { defineQuery } from "next-sanity";

export const animalsQuery = defineQuery(`
  *[_type == "animal"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    species,
    status,
    bio,
    years,
    photo
  }
`);
