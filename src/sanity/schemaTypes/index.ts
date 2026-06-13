import { type SchemaTypeDefinition } from "sanity";
import { projectType } from "./projectType";
import { skillType } from "./skillType";
import { experienceType } from "./experienceType";
import { recommendationType } from "./recommendationType";
import durationType from "./durationType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, skillType, experienceType, recommendationType, durationType],
};
