import { PARTNERS_QUERY, UPCOMING_EVENTS_QUERY } from "@/sanity/lib/queries";
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
  const partners = await client.fetch(PARTNERS_QUERY);

  return (
    <>
      <Hero />
      <FireInfoSection />
      <WorldBuildingSection />
      <TheFuture />
      <Benefits />
      <BuiltToLast />
      <EventSlider events={events} />
      <Partners partners={partners} />
      <CitationsModal />
    </>
  );
}
