import { GENERAL_QUERY } from "@/sanity/lib/queries";
import { EVENTS_QUERY } from "@/sanity/lib/queries";
import { PARTNERS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import Button from "@/components/Button";

import Eyeballs from "@/components/Eyeballs";

import SplitTextBg from "@/components/SplitTextBg";

export default async function Home() {
  const general = await client.fetch(GENERAL_QUERY);
  const events = await client.fetch(EVENTS_QUERY);
  const partners = await client.fetch(PARTNERS_QUERY);

  return (
    <div style={{ height: "300vh" }}>
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
        }}
      >
        <Eyeballs />
        <Eyeballs />
        <Eyeballs />

        <Button href="/about">Forest Filled</Button>
        <Button href="/contact" fill={false}>
          Forest Outline
        </Button>

        <Button href="https://example.com" color="orange">
          Orange Filled
        </Button>
        <Button href="https://example.com" color="orange" fill={false}>
          Orange Outline
        </Button>

        {/* Click Handlers
        <Button onClick={() => alert("Clicked!")} color="cream">
          Cream Filled
        </Button>
        <Button onClick={() => alert("Clicked!")} color="cream" fill={false}>
          Cream Outline
        </Button> */}
      </div>
    </div>
  );
}
