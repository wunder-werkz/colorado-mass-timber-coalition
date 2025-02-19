import { defineQuery } from "next-sanity";

export const GENERAL_QUERY = defineQuery(`*[_type == "general"]`);
export const EVENTS_QUERY = defineQuery(
  `*[_type == "event"] | order(sartDate desc)`
);
export const PARTNERS_QUERY = defineQuery(`*[_type == "partner"]`);
