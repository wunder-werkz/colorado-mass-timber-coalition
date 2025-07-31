import { HOME_QUERY, UPCOMING_EVENTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

import EventSlider from "@/components/EventSlider";
import Partners from "@/containers/Partners";
import ImageSliderSection from "@/components/ImageSlider";
import Mission from "@/components/Mission";
import TakeActionBar from "@/components/TakeActionBar";
import FooterLogo from "@/components/SVG/FooterLogo";


export default async function Home() {
  const events = await client.fetch(UPCOMING_EVENTS_QUERY);
  const homepage = await client.fetch(HOME_QUERY);

  return (
    <>
    <div className="intro-logo">
        <FooterLogo />
    </div>
    {homepage && homepage[0].heroSlider && homepage[0].heroSlider.length > 0 && (
      <ImageSliderSection images={homepage[0].heroSlider}/>
    )}
    {homepage && homepage[0].mission && <Mission mission={homepage[0].mission}/>}
    {homepage && homepage[0].takeActionHeadline && 
    <TakeActionBar headline={homepage[0].takeActionHeadline} copy={homepage[0].takeActionCopy} link={homepage[0].takeActionLink} />}
      {homepage &&
        homepage[0] &&
        homepage[0].partners &&
        homepage[0].partners.length > 0 && (
          <Partners
            partners={homepage[0].partners}
            partnersText={homepage[0].partnersText}
          />
        )}
      {events && events.length > 0 && <EventSlider events={events} />}
    </>
  );
}
