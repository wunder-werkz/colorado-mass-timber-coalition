import { GENERAL_QUERY, EVENTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import EventsClient from "@/containers/EventsClient";

export default async function Events() {
  const events = await client.fetch(EVENTS_QUERY);
  const general = await client.fetch(GENERAL_QUERY);

  return <EventsClient events={events} general={general} />;
}
