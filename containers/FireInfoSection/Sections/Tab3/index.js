"use client";

import { useRef } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import wolfCreekImage from "@/public/img/tabs/WolfCreek.jpg";

import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";
import Stumpy from "@/components/Stumpy";

import useWindowSize from "@/hooks/useWindowSize";

import { mapToGlobalProgress } from "../../utils";

export default function Tab3({ index }) {
  const { width } = useWindowSize();
  const smScreen = width < 1080;
  const phoneScreen = width < 900;

  const sectionTitleRef = useRef(null);
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const stumpTextRef = useRef(null);

  return (
    <div className={`${styles.container}`}>
      <div className={styles.column}>
        <div>
          {smScreen && (
            <>
              <ST.Waypoint
                at={mapToGlobalProgress(index, 1)}
                onCall={() => sectionTitleRef.current?.restart()}
                onReverseCall={() => sectionTitleRef.current?.reverse()}
              />

              <ST.Waypoint
                at={mapToGlobalProgress(index, 40)}
                onCall={() => sectionTitleRef.current?.reverse()}
                onReverseCall={() => sectionTitleRef.current?.restart()}
              />

              <div className={`${styles.sectionTitle}`}>
                <SplitTextBg ref={sectionTitleRef} color="forest" inline>
                  <h2>{CONTENT.sectionTitle}</h2>
                </SplitTextBg>
              </div>
            </>
          )}

          {smScreen && (
            <>
              <ST.Waypoint
                at={mapToGlobalProgress(index, 40)}
                onCall={() => headlineRef.current?.reverse()}
                onReverseCall={() => headlineRef.current?.restart()}
              />
            </>
          )}
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
        </div>

        <ST.Waypoint
          at={mapToGlobalProgress(index, phoneScreen ? 50 : 8)}
          onCall={() => copyRef.current?.restart()}
          onReverseCall={() => copyRef.current?.reverse()}
        />
        <div className={`${styles.copy}`}>
          <SplitTextBg ref={copyRef} color="orange">
            <p>
              Over 22% of the standing trees in Colorado forests are dead and as
              a tree decomposes, it releases carbon instead of storing it{" "}
              <sup>1</sup> Estimates suggest that since 1990 suggest that our
              forest ecosystems have been acting as a net source of carbon
              rather than a net sink<sup>2,3</sup> Climate change and previous
              forest management practices, or lack thereof, are amplifying these
              events.
            </p>
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
                url={CONTENT.image.src}
                caption={CONTENT.image.alt}
              />
            </div>
          </ST.Animation>
        </div>

        <div className={styles.stumpyWrap}>
          <ST.Animation
            tween={{
              start: mapToGlobalProgress(index, phoneScreen ? 70 : 50),
              end: mapToGlobalProgress(index, phoneScreen ? 80 : 60),
              fromTo: [
                { opacity: 0, scale: 0.2 },
                { opacity: 1, scale: 1 },
              ],
              ease: "power2.out",
            }}
          >
            <div className={styles.stumpy}>
              <Stumpy type="tree" color="orange" />
            </div>
          </ST.Animation>
          <ST.Waypoint
            at={mapToGlobalProgress(index, phoneScreen ? 80 : 60)}
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
  sectionTitle: "Why This Is Happening?",
  headline:
    "These conditions have been driven by disease, insect infestation and uncharacteristic, mega wildfires",
  image: {
    src: wolfCreekImage,
    alt: "Wolf Creek Pass",
  },
  stumpText: "Colorado forests are actively contributing to climate change",
};
