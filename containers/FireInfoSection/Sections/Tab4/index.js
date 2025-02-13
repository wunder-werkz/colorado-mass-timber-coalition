"use client";

import { useRef } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";
import Stumpy from "@/components/Stumpy";

import { mapToGlobalProgress } from "../../utils";

export default function Tab4({ index }) {
  const headlineT4Ref = useRef(null);
  const copyT4Ref = useRef(null);
  const stumpTextT4Ref = useRef(null);

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
              url="/img/hero.jpeg"
              caption={"Building better starts with creating healthy forests"}
            />
          </div>
        </ST.Animation>
      </div>

      <ST.Waypoint
        at={mapToGlobalProgress(index, 1)}
        onCall={() => headlineT4Ref.current?.restart()}
        onReverseCall={() => headlineT4Ref.current?.reverse()}
      />
      <div className={`${styles.headline}`}>
        <SplitTextBg
          ref={headlineT4Ref}
          color="cream"
          inline
          key={`headline-${index}`}
        >
          <h2>{CONTENT.headline}</h2>
        </SplitTextBg>
      </div>

      <ST.Waypoint
        at={mapToGlobalProgress(index, 8)}
        onCall={() => copyT4Ref.current?.restart()}
        onReverseCall={() => copyT4Ref.current?.reverse()}
      />
      <div className={`${styles.copy}`}>
        <SplitTextBg ref={copyT4Ref} color="orange" key={`copy-${index}`}>
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
            <Stumpy type="tree" />
          </div>
        </ST.Animation>
        <ST.Waypoint
          at={mapToGlobalProgress(index, 60)}
          onCall={() => stumpTextT4Ref.current?.restart()}
          onReverseCall={() => stumpTextT4Ref.current?.reverse()}
        />
        <div className={`${styles.stumpyText}`}>
          <SplitTextBg ref={stumpTextT4Ref} color="cream">
            <p>{CONTENT.stumpText} </p>
          </SplitTextBg>
        </div>
      </div>
    </div>
  );
}

const CONTENT = {
  headline: "Healthy forests are critical to providing clean water",
  copy: "As snow melts our forests help remove pollutants and sediment, regulate streamflow, reduce flood damage, and replenish groundwater.4–6  Healthy forests have even shown to reduce water treatment costs.7",
  image: {
    src: "/images/fire-info-section/tab1.jpg",
    alt: "East Troublesome Fire burn scar, © Jason Houston",
  },
  stumpText:
    "The Colorado River provides water to 40 million people across 30 tribes and seven states in the west",
};
