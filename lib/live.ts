import "server-only";
import { defineLive } from "next-sanity";
// import your local configured client
import { client } from "@/sanity/lib/client";

// export the sanityFetch helper and the SanityLive component
export const { sanityFetch, SanityLive } = defineLive({
  client,
});
