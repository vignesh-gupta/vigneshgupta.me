import { WrenchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const skillType = defineType({
  name: "skill",
  title: "Skills",
  type: "document",
  icon: WrenchIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Design", value: "design" },
          { title: "Technology", value: "technology" },
          { title: "Tools", value: "tools" },
          { title: "Platforms", value: "platforms" },
        ],
      },
    }),
    defineField({
      name: "use",
      title: "Use",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
    }),
  ],
});
