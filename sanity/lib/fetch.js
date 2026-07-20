import { client } from "./client";

// Every Sanity read goes through here so it carries cache tags that
// /api/revalidate can invalidate when content changes.
//
// GLOBAL_TAG is attached to every query on purpose. Our queries dereference
// heavily (heroSlider[]->, introSection->, link[]->, pageSections[]->), so when
// a webhook fires for a nested document there is no reliable way to name every
// page type that renders it. Invalidating everything on any edit is correct and
// cheap here — the site is a handful of static pages.
export const GLOBAL_TAG = "sanity";

export function sanityFetch(query, params = {}, tags = []) {
  return client.fetch(query, params, {
    next: { tags: [GLOBAL_TAG, ...tags] },
  });
}
