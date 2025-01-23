import { GENERAL_QUERY } from "@/sanity/lib/queries";
import { EVENTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

export default async function Events() {
  const events = await client.fetch(EVENTS_QUERY);
  const general = await client.fetch(GENERAL_QUERY);

  return (
    <div>
      <h3>Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event._id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
}
