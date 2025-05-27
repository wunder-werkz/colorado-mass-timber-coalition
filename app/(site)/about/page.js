import Hero from "@/containers/Hero";
import FireInfoSection from "@/containers/FireInfoSection";
import WorldBuildingSection from "@/containers/WorldBulding";
import TheFuture from "@/containers/TheFuture";
import Benefits from "@/containers/Benefits";
import BuiltToLast from "@/containers/BuiltToLast";
import CitationsModal from "@/containers/CitationsModal";

export default async function Home() {
  return (
    <>
      <Hero />
      <FireInfoSection />
      <WorldBuildingSection />
      <TheFuture />
      <Benefits />
      <BuiltToLast />
      <CitationsModal />
    </>
  );
}
