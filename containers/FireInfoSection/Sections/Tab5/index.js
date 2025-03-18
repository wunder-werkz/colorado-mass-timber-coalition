"use client";

import { useRef, useCallback } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import monarchPass from "@/public/img/tabs/millertimber.jpg";
import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";
import Stumpy from "@/components/Stumpy";

import { mapToGlobalProgress } from "../../utils";

import useWindowSize from "@/hooks/useWindowSize";

export default function Tab5({ index }) {
  const { width } = useWindowSize();
  const smScreen = width < 1080;
  const phoneScreen = width < 900;

  const sectionTitleRef = useRef(null);
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const stumpTextRef = useRef(null);

  // Memoized callbacks for animations
  const handleSectionTitleStart = useCallback(() => {
    sectionTitleRef.current?.restart();
  }, []);

  const handleSectionTitleReverse = useCallback(() => {
    sectionTitleRef.current?.reverse();
  }, []);

  const handleHeadlineStart = useCallback(() => {
    headlineRef.current?.restart();
  }, []);

  const handleHeadlineReverse = useCallback(() => {
    headlineRef.current?.reverse();
  }, []);

  const handleCopyStart = useCallback(() => {
    copyRef.current?.restart();
  }, []);

  const handleCopyReverse = useCallback(() => {
    copyRef.current?.reverse();
  }, []);

  const handleStumpTextStart = useCallback(() => {
    stumpTextRef.current?.restart();
  }, []);

  const handleStumpTextReverse = useCallback(() => {
    stumpTextRef.current?.reverse();
  }, []);

  return (
    <div className={`${styles.container}`}>
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

      <div className={styles.headlineWrap}>
        {smScreen && (
          <>
            <ST.Waypoint
              at={mapToGlobalProgress(index, 5)}
              onCall={handleSectionTitleStart}
              onReverseCall={handleSectionTitleReverse}
            />

            <div className={`${styles.sectionTitle}`}>
              <SplitTextBg ref={sectionTitleRef} color="cream" inline>
                <h2>{CONTENT.sectionTitle}</h2>
              </SplitTextBg>
            </div>
          </>
        )}

        {phoneScreen && (
          <>
            <ST.Waypoint
              at={mapToGlobalProgress(index, 40)}
              onCall={handleSectionTitleReverse}
              onReverseCall={handleSectionTitleStart}
            />
            <ST.Waypoint
              at={mapToGlobalProgress(index, 40)}
              onCall={handleHeadlineReverse}
              onReverseCall={handleHeadlineStart}
            />
          </>
        )}

        <ST.Waypoint
          at={mapToGlobalProgress(index, 5)}
          onCall={handleHeadlineStart}
          onReverseCall={handleHeadlineReverse}
        />
        <div className={`${styles.headline}`}>
          <SplitTextBg ref={headlineRef} color="cream" inline>
            <h2>{CONTENT.headline}</h2>
          </SplitTextBg>
        </div>
      </div>

      <ST.Waypoint
        at={mapToGlobalProgress(index, phoneScreen ? 50 : 15)}
        onCall={handleCopyStart}
        onReverseCall={handleCopyReverse}
      />
      <div className={styles.copy}>
        <SplitTextBg ref={copyRef} color="orange" body={true}>
          <p>
            In addition to climate change, a history of of fire suppression
            activity have led to unhealthy and unbalanced forests.<sup>8</sup>{" "}
            Active stewardship will help our forests endure naturally occurring
            wildfires, be less susceptible to disease and insect infestation,
            support a broad range of biodiversity, and contribute to healthy
            watersheds.<sup>9,10</sup>
          </p>
        </SplitTextBg>
      </div>

      <div className={styles.stumpyWrap}>
        <ST.Animation
          tween={{
            start: mapToGlobalProgress(index, phoneScreen ? 65 : 50),
            end: mapToGlobalProgress(index, phoneScreen ? 75 : 60),
            fromTo: [
              { opacity: 0, scale: 0.2 },
              { opacity: 1, scale: 1 },
            ],
            ease: "power2.out",
          }}
        >
          <div className={styles.stumpy}>
            <Stumpy type="stump" color="cream" />
          </div>
        </ST.Animation>
        <ST.Waypoint
          at={mapToGlobalProgress(index, phoneScreen ? 70 : 65)}
          onCall={handleStumpTextStart}
          onReverseCall={handleStumpTextReverse}
        />
        <div className={`${styles.stumpyText}`}>
          <SplitTextBg ref={stumpTextRef} color="cream" stumpy={true}>
            <p>{CONTENT.stumpText} </p>
          </SplitTextBg>
        </div>
      </div>
    </div>
  );
}

const CONTENT = {
  headline: "We need to be proactive, not reactive",
  sectionTitle: "What Can We Do?",
  image: {
    src: monarchPass,
    alt: "Monarch Pass, Arkansas River Watershed Collaborative and Miller Timber Services",
  },
  stumpText:
    "The health of certain forests could improve through management practices like prescribed burns or mechanical thinning, or salvage harvesting (shown here).",
};
