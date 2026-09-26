import { defineField, defineType } from "sanity";

// The human counterpart to animal.ts — same "dead simple" philosophy: one
// document type, a small number of fields, no code changes needed to add,
// remove, or reorder a team member. Covers everyone shown in the "Our
// human team" section of the Team page: founders, co-organizers,
// volunteers, whoever the sanctuary wants credited.
export const personType = defineType({
  name: "person",
  title: "Team member",
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
        "Used to identify this person on the page. Generated from the name — just press \"Generate\".",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description:
        'How this person is credited — for example: "Founder", "Co-Organizer", "Volunteer".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description:
        "Drag a photo here, or click to upload. Optional — team members without a photo yet show a placeholder.",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description: "A short paragraph introducing this person.",
    }),
    defineField({
      name: "order",
      title: "Display order (optional)",
      type: "number",
      description:
        "Lower numbers show first on the Team page. Leave blank and everyone without a number sorts alphabetically by name after the ones that have one.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
