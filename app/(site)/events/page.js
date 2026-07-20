import { PAST_EVENTS_QUERY, UPCOMING_EVENTS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import EventsClient from "@/containers/EventsClient";

export default async function Events() {
  const [pastEvents, upcomingEvents] = await Promise.all([
    sanityFetch(PAST_EVENTS_QUERY, {}, ["event"]),
    sanityFetch(UPCOMING_EVENTS_QUERY, {}, ["event"]),
  ]);

  if (pastEvents || upcomingEvents) {
    return (
      <EventsClient pastEvents={pastEvents} upcomingEvents={upcomingEvents} />
    );
  } else {
    return <h1> no events</h1>
  }

}
