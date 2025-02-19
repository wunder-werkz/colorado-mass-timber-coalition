"use client";

import { useRef } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";
import Stumpy from "@/components/Stumpy";

import { mapToGlobalProgress } from "../../utils";

export default function Tab3({ index }) {
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const stumpTextRef = useRef(null);

  return (
    <div className={`${styles.tabPanel}`}>
      <div className={styles.column}>
        <ST.Waypoint
          at={mapToGlobalProgress(index, 1)}
          onCall={() => headlineRef.current?.restart()}
          onReverseCall={() => headlineRef.current?.reverse()}
        />

        <div className={`${styles.headline}`}>
          <SplitTextBg ref={headlineRef} color="forest" inline>
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
      </div>
      <div className={styles.column}>
        <div className={styles.scaleWrap}>
          <ST.Animation
            tween={{
              start: mapToGlobalProgress(index, 5),
              end: mapToGlobalProgress(index, 15),
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
            <SplitTextBg ref={stumpTextRef} color="orange">
              <p>{CONTENT.stumpText} </p>
            </SplitTextBg>
          </div>
        </div>
      </div>
    </div>
  );
}

const CONTENT = {
  headline:
    "These conditions have been driven by disease, insect infestation and uncharacteristic, mega wildfires",
  copy: "Over 22% of the standing trees in Colorado forests are dead and as a tree decomposes, it releases carbon instead of storing it.1 Estimates suggest that since 1990 suggest that our forest ecosystems have been acting as a net source of carbon rather than a net sink.2,3 Climate change and previous forest management practices, or lack thereof, are amplifying these events.",
  image: {
    src: "/images/fire-info-section/tab1.jpg",
    alt: "Wolf Creek Pass",
  },
  stumpText: "Colorado forests are actively contributing to climate change",
};
