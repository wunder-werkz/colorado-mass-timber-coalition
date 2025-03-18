"use client";

import { useRef, useCallback } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";
import Stumpy from "@/components/Stumpy";

import useWindowSize from "@/hooks/useWindowSize";
import pineGulchImage from "@/public/img/tabs/PineGulch.jpg";

import { mapToGlobalProgress } from "../../utils";

export default function Tab1({ index }) {
  const { width } = useWindowSize();
  const smScreen = width < 1080;
  const phoneScreen = width < 900;
  const sectionTitleRef = useRef(null);
  const titleRef = useRef(null);
  const stumpTextRef = useRef(null);

  // Memoized callbacks for animations
  const handleSectionTitleStart = useCallback(() => {
    sectionTitleRef.current?.restart();
  }, []);

  const handleSectionTitleReverse = useCallback(() => {
    sectionTitleRef.current?.reverse();
  }, []);

  const handleTitleStart = useCallback(() => {
    titleRef.current?.restart();
  }, []);

  const handleTitleReverse = useCallback(() => {
    titleRef.current?.reverse();
  }, []);

  const handleStumpTextStart = useCallback(() => {
    stumpTextRef.current?.restart();
  }, []);

  const handleStumpTextReverse = useCallback(() => {
    stumpTextRef.current?.reverse();
  }, []);

  return (
    <div className={`${styles.container}`}>
      <div className={styles.titleWrap}>
        {smScreen && (
          <>
            <ST.Waypoint
              at={mapToGlobalProgress(index, 1)}
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
        <ST.Waypoint
          at={mapToGlobalProgress(index, 1)}
          onCall={handleTitleStart}
          onReverseCall={handleTitleReverse}
        />

        <div className={`${styles.title}`}>
          <SplitTextBg ref={titleRef} color="cream" inline>
            <h2 className={styles.title}>{CONTENT.title}</h2>
          </SplitTextBg>
        </div>
      </div>
      <div className={styles.mediaWCaption}>
        <MediaWCaption url={CONTENT.image.src} caption={CONTENT.image.alt} />
      </div>
      <div className={styles.stumpyWrap}>
        <ST.Animation
          tween={{
            start: mapToGlobalProgress(index, phoneScreen ? 65 : 60),
            end: mapToGlobalProgress(index, phoneScreen ? 75 : 70),
            fromTo: [
              { opacity: 0, scale: 0.2 },
              { opacity: 1, scale: 1 },
            ],
            ease: "power2.out",
          }}
        >
          <div className={styles.stumpy}>
            <Stumpy type="tree" color="orangegreen" />
          </div>
        </ST.Animation>
        <ST.Waypoint
          at={mapToGlobalProgress(index, phoneScreen ? 70 : 65)}
          onCall={handleStumpTextStart}
          onReverseCall={handleStumpTextReverse}
        />
        <div className={`${styles.stumpyText}`}>
          <SplitTextBg ref={stumpTextRef} color="forest" stumpy={true}>
            <p>{CONTENT.stumpText} </p>
          </SplitTextBg>
        </div>
      </div>
    </div>
  );
}

const CONTENT = {
  sectionTitle: "The State Of Our Forests",
  title:
    "But right now, many of our forests exhibit declining health and resilience",
  image: {
    src: pineGulchImage,
    alt: "Pine Gulch Fire, Kyle Miller Photography",
  },
  stumpText:
    "Colorado Forests are carbon sources. They emit more carbon than they sequester",
};
