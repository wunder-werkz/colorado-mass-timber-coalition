import { GENERAL_QUERY } from "@/sanity/lib/queries";
import { EVENTS_QUERY } from "@/sanity/lib/queries";
import { PARTNERS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

import SplitTextBg from "@/components/SplitTextBg";

export default async function Home() {
  const general = await client.fetch(GENERAL_QUERY);
  const events = await client.fetch(EVENTS_QUERY);
  const partners = await client.fetch(PARTNERS_QUERY);

  return (
    <div>
      <div style={{ maxWidth: "400px" }}>
        <SplitTextBg color="forest" inline>
          a bunch of text a bunch of texta bunch of text a bunch of text a bunch
          of text a bunch of text
        </SplitTextBg>
      </div>
      <h2>{general.contactEmail}</h2>

      <h3>Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event._id}>{event.name}</li>
        ))}
      </ul>

      <h3>Partners</h3>
      <ul>
        {partners.map((partner) => (
          <li key={partner._id}>{partner.name}</li>
        ))}
      </ul>
    </div>
  );
}
