"use client";

import { useRef, useCallback } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import placeholderImg from "@/public/img/hero.jpg";

import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";
import Stumpy from "@/components/Stumpy";

import useWindowSize from "@/hooks/useWindowSize";

import { mapToGlobalProgress } from "../../utils";

export default function Tab4({ index }) {
  const { width } = useWindowSize();
  const smScreen = width < 1080;
  const phoneScreen = width < 900;

  const sectionTitleRef = useRef(null);
  const headlineT4Ref = useRef(null);
  const copyT4Ref = useRef(null);
  const stumpTextT4Ref = useRef(null);

  // Memoized callbacks for animations
  const handleSectionTitleStart = useCallback(() => {
    sectionTitleRef.current?.restart();
  }, []);

  const handleSectionTitleReverse = useCallback(() => {
    sectionTitleRef.current?.reverse();
  }, []);

  const handleHeadlineStart = useCallback(() => {
    headlineT4Ref.current?.restart();
  }, []);

  const handleHeadlineReverse = useCallback(() => {
    headlineT4Ref.current?.reverse();
  }, []);

  const handleCopyStart = useCallback(() => {
    copyT4Ref.current?.restart();
  }, []);

  const handleCopyReverse = useCallback(() => {
    copyT4Ref.current?.reverse();
  }, []);

  const handleStumpTextStart = useCallback(() => {
    stumpTextT4Ref.current?.restart();
  }, []);

  const handleStumpTextReverse = useCallback(() => {
    stumpTextT4Ref.current?.reverse();
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
              url={placeholderImg}
              caption={"Building better starts with creating healthy forests"}
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
          <SplitTextBg
            ref={headlineT4Ref}
            color="cream"
            inline
            key={`headline-${index}`}
          >
            <h2>{CONTENT.headline}</h2>
          </SplitTextBg>
        </div>
      </div>

      <ST.Waypoint
        at={mapToGlobalProgress(index, phoneScreen ? 50 : 15)}
        onCall={handleCopyStart}
        onReverseCall={handleCopyReverse}
      />
      <div className={`${styles.copy}`}>
        <SplitTextBg ref={copyT4Ref} color="orange" key={`copy-${index}`}>
          <p>
            As snow melts our forests help remove pollutants and sediment,
            regulate streamflow, reduce flood damage, and replenish groundwater.
            <sup>4–6</sup> Healthy forests have even shown to reduce water
            treatment costs.<sup>7</sup>
          </p>
        </SplitTextBg>
      </div>

      <div className={styles.stumpyWrap}>
        <ST.Animation
          tween={{
            start: mapToGlobalProgress(index, phoneScreen ? 65 : 50),
            end: mapToGlobalProgress(index, phoneScreen ? 75 : 60),
            to: { opacity: 1, scale: 1 },
            ease: "power2.out",
          }}
        >
          <div className={styles.stumpy}>
            <Stumpy type="tree" />
          </div>
        </ST.Animation>
        <ST.Waypoint
          at={mapToGlobalProgress(index, phoneScreen ? 70 : 60)}
          onCall={handleStumpTextStart}
          onReverseCall={handleStumpTextReverse}
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
  sectionTitle: "Why Does It Matter?",
  headline: "Healthy forests are critical to providing clean water",
  image: {
    src: "/images/fire-info-section/tab1.jpg",
    alt: "East Troublesome Fire burn scar, © Jason Houston",
  },
  stumpText:
    "The Colorado River provides water to 40 million people across 30 tribes and seven states in the west",
};
