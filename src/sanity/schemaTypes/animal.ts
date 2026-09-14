import { defineField, defineType } from "sanity";

// The single content type Beth needs: one animal, one status, one photo.
// Deliberately kept to a small number of fields — see the "dead simple"
// requirement in README.md's Content management section. This one type
// covers every animal page on the site: switching "Status" to "In loving
// memory" is what moves an animal from the main residents page to the
// In Memory page, and back, with no other change needed anywhere.
export const animalType = defineType({
  name: "animal",
  title: "Animal",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Used in the animal's page URL. Generated from the name — just press \"Generate\".",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "species",
      title: "Species",
      type: "string",
      description: 'For example: "Dog", "Cat", "Pigeon", "Goat".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      description:
        "Where this animal shows up on the website. Changing this is all it takes to move an animal between pages.",
      options: {
        layout: "radio",
        list: [
          { title: "Rescued (recently arrived, still settling in)", value: "rescued" },
          { title: "Permanent resident", value: "permanent-resident" },
          { title: "Adopted", value: "adopted" },
          { title: "In loving memory", value: "in-memory" },
        ],
      },
      initialValue: "rescued",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description:
        "Drag a photo here, or click to upload. Optional — animals without a photo yet show a placeholder.",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description:
        "A short paragraph about this animal. For an animal marked \"In loving memory\", write this as the tribute.",
    }),
    defineField({
      name: "years",
      title: "Years (optional)",
      type: "string",
      description:
        'Only shown for animals marked "In loving memory" — e.g. "2015–2023".',
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "status", media: "photo" },
    prepare({ title, subtitle, media }) {
      const statusLabels: Record<string, string> = {
        rescued: "Rescued",
        "permanent-resident": "Permanent resident",
        adopted: "Adopted",
        "in-memory": "In loving memory",
      };
      return {
        title,
        subtitle: statusLabels[subtitle as string] || subtitle,
        media,
      };
    },
  },
});
