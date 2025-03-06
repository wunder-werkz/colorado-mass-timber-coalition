import { HOME_QUERY, UPCOMING_EVENTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

import Hero from "@/containers/Hero";
import EventSlider from "@/components/EventSlider";
import FireInfoSection from "@/containers/FireInfoSection";
import WorldBuildingSection from "@/containers/WorldBulding";
import TheFuture from "@/containers/TheFuture";
import Benefits from "@/containers/Benefits";
import BuiltToLast from "@/containers/BuiltToLast";
import Partners from "@/containers/Partners";
import CitationsModal from "@/containers/CitationsModal";

export default async function Home() {
  const events = await client.fetch(UPCOMING_EVENTS_QUERY);
  const homepage = await client.fetch(HOME_QUERY);

  return (
    <>
      <Hero />
      <FireInfoSection />
      <WorldBuildingSection />
      <TheFuture />
      <Benefits />
      <BuiltToLast />
      {(events && events.length > 0) &&
        <EventSlider events={events} />
      }
      {(homepage[0].partners && homepage[0].partners.length > 0) &&
        <Partners partners={homepage[0].partners} partnersText={homepage[0].partnersText} />
      }
      <CitationsModal />
    </>
  );
}
