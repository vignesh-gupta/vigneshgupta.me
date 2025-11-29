/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";
import { dataset } from "./src/sanity/env";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "vignesh",
});
