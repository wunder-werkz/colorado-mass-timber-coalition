import { ACTION_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

import TakeAction from "@/containers/TakeAction";

export default async function Action() {
  const actionPage = await client.fetch(ACTION_QUERY);

  if (actionPage) {
    return (
      <TakeAction content={actionPage} />
    );
  } else {
    return <h1> no page</h1>
  }
}
