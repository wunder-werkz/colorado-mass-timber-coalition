"use client";

import { useRef } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";
import Stumpy from "@/components/Stumpy";

import { mapToGlobalProgress } from "../../utils";

export default function Tab5({ index }) {
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const stumpTextRef = useRef(null);

  return (
    <div className={`${styles.tabPanel}`}>
      <div className={styles.scaleWrap}>
        <ST.Animation
          tween={{
            start: mapToGlobalProgress(index, 1),
            end: mapToGlobalProgress(index, 5),
            fromTo: [
              { scale: 1.1, filter: "blur(10px)" },
              { scale: 1, filter: "blur(0px)" },
            ],
            ease: "power2.out",
          }}
        >
          <div className={styles.mediaWCaption}>
            <MediaWCaption
              url={CONTENT.image.src}
              caption={CONTENT.image.alt}
            />
          </div>
        </ST.Animation>
      </div>

      <ST.Waypoint
        at={mapToGlobalProgress(index, 1)}
        onCall={() => headlineRef.current?.restart()}
        onReverseCall={() => headlineRef.current?.reverse()}
      />
      <div className={`${styles.headline}`}>
        <SplitTextBg ref={headlineRef} color="cream" inline>
          <h2>{CONTENT.headline}</h2>
        </SplitTextBg>
      </div>

      <ST.Waypoint
        at={mapToGlobalProgress(index, 8)}
        onCall={() => copyRef.current?.restart()}
        onReverseCall={() => copyRef.current?.reverse()}
      />
      <div className={`${styles.copy}`}>
        <SplitTextBg ref={copyRef} color="orange">
          <p>{CONTENT.copy} </p>
        </SplitTextBg>
      </div>

      <div className={styles.stumpyWrap}>
        <ST.Animation
          tween={{
            start: mapToGlobalProgress(index, 50),
            end: mapToGlobalProgress(index, 60),
            fromTo: [
              { opacity: 0, scale: 0.2 },
              { opacity: 1, scale: 1 },
            ],
            ease: "power2.out",
          }}
        >
          <div className={styles.stumpy}>
            <Stumpy type="stump" />
          </div>
        </ST.Animation>
        <ST.Waypoint
          at={mapToGlobalProgress(index, 60)}
          onCall={() => stumpTextRef.current?.restart()}
          onReverseCall={() => stumpTextRef.current?.reverse()}
        />
        <div className={`${styles.stumpyText}`}>
          <SplitTextBg ref={stumpTextRef} color="cream">
            <p>{CONTENT.stumpText} </p>
          </SplitTextBg>
        </div>
      </div>
    </div>
  );
}

const CONTENT = {
  headline: "We need to be proactive, not reactive",
  copy: "In addition to climate change, centuries of fire suppression activity have led to unhealthy and unbalanced forests.8 Active stewardship will help our forests endure naturally occurring wildfires, be less susceptible to disease and insect infestation, support a broad range of biodiversity, and contribute to healthy watersheds.9,10",
  image: {
    src: "/img/tabs/millertimber.jpeg",
    alt: "Monarch Pass, <br/>Arkansas River Watershed Collaborative<br/> and Miller Timber Services",
  },
  stumpText:
    "The health of certain forests could improve through management practices like prescribed burns or mechanical thinning (shown here).",
};
