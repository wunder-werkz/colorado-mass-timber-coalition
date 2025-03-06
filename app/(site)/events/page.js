import { PAST_EVENTS_QUERY, UPCOMING_EVENTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import EventsClient from "@/containers/EventsClient";

export default async function Events() {
  const pastEvents = await client.fetch(PAST_EVENTS_QUERY);
  const upcomingEvents = await client.fetch(UPCOMING_EVENTS_QUERY);

  if (pastEvents || upcomingEvents) {
    return (
      <EventsClient pastEvents={pastEvents} upcomingEvents={upcomingEvents} />
    );
  } else {
    return <h1> no events</h1>
  }

}
