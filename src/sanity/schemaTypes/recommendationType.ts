import { defineField, defineType } from "sanity";
import { EqualIcon } from "@sanity/icons";

export const recommendationType = defineType({
  name: "recommendation",
  title: "Recommendation",
  icon: EqualIcon,
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "Job title or position of the person recommending you.",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "relationship",
      title: "Relationship",
      type: "string",
      description: "How you worked together or collaborated.",
    }),
    defineField({
      name: "quote",
      title: "Recommendation",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "profileUrl",
      title: "Profile URL",
      type: "url",
      description: "Optional link to LinkedIn or another public profile.",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
