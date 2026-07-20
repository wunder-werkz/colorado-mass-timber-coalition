import { ACTION_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";

import TakeAction from "@/containers/TakeAction";

export default async function Action() {
  const actionPage = await sanityFetch(ACTION_QUERY, {}, ["takeAction"]);

  if (actionPage) {
    return (
      <TakeAction content={actionPage} />
    );
  } else {
    return <h1> no page</h1>
  }
}
