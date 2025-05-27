import { defineQuery } from "next-sanity";

export const GENERAL_QUERY = defineQuery(`*[_type == "general"]`);

// Query for upcoming and current events (today and future)
export const UPCOMING_EVENTS_QUERY = defineQuery(
  `*[_type == "event" && startDate >= now()] | order(startDate asc)`
);

// Query for past events
export const PAST_EVENTS_QUERY = defineQuery(
  `*[_type == "event" && startDate < now()] | order(startDate desc)`
);

// Keep the original query for backwards compatibility
export const EVENTS_QUERY = defineQuery(
  `*[_type == "event"] | order(startDate desc)`
);

export const HOME_QUERY = defineQuery(`*[_type == "homePage"]{
  pageTitle,
  pageMetadata,
  partnersText,
  partners[]-> {
     name, 
     link
  }
}`);


export const ACTION_QUERY = defineQuery(`*[_type == "takeAction"]{
  pageTitle,
  pageMetadata,
  headline,
  orgHeadline,
  orgGroups[]-> {
     groupTitle,
     organizations[]-> {
      name,
      link,
     },
  },
  subHeadline,
  subcommittees[]-> {
    name,
    description
  },
  stumpyText,
  stumpyLink[]-> {
    linkTitle,
    url,
    newWindow,
    downloadPdf,
    "downloadUrl": downloadPdf.asset->url,
  },
}`);