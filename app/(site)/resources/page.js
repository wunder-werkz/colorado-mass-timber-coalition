import { RESOURCES_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";

import ResourcesPage from "@/containers/ResourcesPage";

export default async function Resources() {
  const resourcesPage = await sanityFetch(RESOURCES_QUERY, {}, ["resourcesPage"]);

  if (resourcesPage && resourcesPage[0]) {
    return (
      <ResourcesPage content={resourcesPage[0]} />
    );
  } else {
    return <h1> no page</h1>
  }
}
