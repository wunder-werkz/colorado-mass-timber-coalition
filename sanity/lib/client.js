import { createClient } from "next-sanity";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-07-11",
  useCdn: false,
});