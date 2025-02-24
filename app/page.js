import { GENERAL_QUERY } from "@/sanity/lib/queries";
import { EVENTS_QUERY } from "@/sanity/lib/queries";
import { PARTNERS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

import Hero from "@/components/Hero";
import EventSlider from "@/components/EventSlider";
import FireInfoSection from "@/containers/FireInfoSection";
import WorldBuildingSection from "@/containers/WorldBulding";
import TheFuture from "@/containers/TheFuture";
import Benefits from "@/containers/Benefits";
import BuiltToLast from "@/containers/BuiltToLast";
import Partners from "@/containers/Partners";
import Footer from "@/components/Footer";
import CitationsModal from "@/containers/CitationsModal";

export default async function Home() {
  const general = await client.fetch(GENERAL_QUERY);
  const events = await client.fetch(EVENTS_QUERY);
  const partners = await client.fetch(PARTNERS_QUERY);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "#f0f5ea",
          minHeight: "100vh",
        }}
      >
        <Hero />
        <FireInfoSection />
        <WorldBuildingSection />
        <TheFuture />
        <Benefits />
        <BuiltToLast />
        <EventSlider events={[...events, ...events, ...events]} />
        <Partners partners={partners} />
        <CitationsModal />
      </div>
      <Footer />
    </div>
  );
}
