import { createClient } from "next-sanity";

import { dataset, projectId } from "../env";

export const write_client = createClient({
  projectId,
  dataset,
  apiVersion: "vX",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
