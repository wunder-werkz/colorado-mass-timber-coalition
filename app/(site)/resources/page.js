import { RESOURCES_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

import ResourcesPage from "@/containers/ResourcesPage";

export default async function Resources() {
  const resourcesPage = await client.fetch(RESOURCES_QUERY);

  if (resourcesPage && resourcesPage[0]) {
    return (
      <ResourcesPage content={resourcesPage[0]} />
    );
  } else {
    return <h1> no page</h1>
  }
}
