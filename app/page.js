import { GENERAL_QUERY } from "@/sanity/lib/queries";
import { EVENTS_QUERY } from "@/sanity/lib/queries";
import { PARTNERS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

import Hero from "@/components/Hero";
import EventSlider from "@/components/EventSlider";
import PinnedTabHolder from "@/containers/PinnedTabHolder";

export default async function Home() {
  const general = await client.fetch(GENERAL_QUERY);
  const events = await client.fetch(EVENTS_QUERY);
  const partners = await client.fetch(PARTNERS_QUERY);

  return (
    <div style={{ position: "relative" }}>
      <Hero />
      <PinnedTabHolder />
      <EventSlider events={[...events, ...events, ...events]} />

      {/* <div style={{ position: "relative", height: "100vh" }}></div>
      <PinnedTabHolder />
      <div style={{ position: "relative", height: "100vh" }}></div> */}
      {/* <h3>Partners</h3>
      <ul>
        {partners.map((partner) => (
          <li key={partner._id}>{partner.name}</li>
        ))}
      </ul> */}
    </div>
  );
}
