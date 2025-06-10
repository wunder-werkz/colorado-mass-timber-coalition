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
  heroSlider[]-> {
     image{
        asset->,
        alt,
        hotspot,
        crop
    },     
    headline,
    link[]-> {
      linkTitle,
      url,
      newWindow,
      downloadPdf,
      "downloadUrl": downloadPdf.asset->url,
    },
  },
  mission,
  takeActionHeadline,
  takeActionCopy,
  takeActionLink[]-> {
    linkTitle,
    url,
    newWindow,
    downloadPdf,
    "downloadUrl": downloadPdf.asset->url,
  },
  partners[]-> {
     name, 
     link
  }
}`);

export const FOOTER_QUERY = defineQuery(`*[_type == "footer"]{
  instaLink,
  email,
  linkedInUrl,
  emailSignupHeadline,
  emailSignupCopy,
  emailSignupLink[]-> {
    linkTitle,
    url,
    newWindow,
    downloadPdf,
    "downloadUrl": downloadPdf.asset->url,
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