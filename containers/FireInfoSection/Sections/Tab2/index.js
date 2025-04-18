"use client";

import { useRef, useCallback } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import coloradoStateForestServiceImage from "@/public/img/tabs/Colorado-State-Forest-Service.jpg";

import { MediaWCaption } from "@/components/MediaWCaption";
import SplitTextBg from "@/components/SplitTextBg";

import useWindowSize from "@/hooks/useWindowSize";

import { mapToGlobalProgress } from "../../utils";
export default function Tab2({ index }) {
  const panelRef = useRef(null);
  const sectionTitleRef = useRef(null);
  const textRef = useRef(null);
  const { width } = useWindowSize();
  const smScreen = width < 1080;

  // Memoized callbacks for animations
  const handleSectionTitleStart = useCallback(() => {
    sectionTitleRef.current?.restart();
  }, []);

  const handleSectionTitleReverse = useCallback(() => {
    sectionTitleRef.current?.reverse();
  }, []);

  const handleTextStart = useCallback(() => {
    textRef.current?.restart();
  }, []);

  const handleTextReverse = useCallback(() => {
    textRef.current?.reverse();
  }, []);

  return (
    <div ref={panelRef} className={`${styles.container} tab2`}>
      <div className={styles.chartContainer}>
        {CONTENT.acresBurned.map((item, i) => (
          <div key={item.year} className={styles.chartBarItemWrapper}>
            <div className={styles.chartBarItem}>
              <div className={styles.chartLabel}>{item.year}</div>
            </div>
            {i !== CONTENT.acresBurned.length - 1 && (
              <div className={styles.dividerWrapper}>
                <div className={styles.divider}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.contentContainer}>
        <ST.Animation
          tween={{
            start: mapToGlobalProgress(index, 0),
            end: mapToGlobalProgress(index, 10),
            fromTo: [{ scale: 1.3 }, { scale: 1 }],
            ease: "power2.out",
          }}
        >
          <div className={styles.mediaWCaption}>
            <MediaWCaption
              url={CONTENT.image.src}
              caption={CONTENT.image.alt}
              imagePosition="center bottom"
            />
            <ST.Animation
              tween={{
                start: mapToGlobalProgress(index, 25),
                end: mapToGlobalProgress(index, 65),
                fromTo: [{ height: 0 }, { height: "100%" }],
                ease: "power2.out",
              }}
            >
              <div className={styles.mediaWCaptionInner}></div>
            </ST.Animation>
          </div>
        </ST.Animation>

        {smScreen && (
          <>
            <ST.Waypoint
              at={mapToGlobalProgress(index, 10)}
              onCall={handleSectionTitleStart}
              onReverseCall={handleSectionTitleReverse}
            />

            <ST.Waypoint
              at={mapToGlobalProgress(index, 20)}
              onCall={handleSectionTitleReverse}
              onReverseCall={handleSectionTitleStart}
            />
            <div className={`${styles.sectionTitle}`}>
              <SplitTextBg ref={sectionTitleRef} color="cream" inline>
                <h2>{CONTENT.sectionTitle}</h2>
              </SplitTextBg>
            </div>
          </>
        )}

        <ST.Animation
          tween={[
            {
              start: mapToGlobalProgress(index, 15),
              end: mapToGlobalProgress(index, 20),
              fromTo: [{ opacity: 0 }, { opacity: 1 }],
              ease: "power2.out",
            },
            {
              start: mapToGlobalProgress(index, 70),
              end: mapToGlobalProgress(index, 75),
              to: { opacity: 0, height: 0 },
              ease: "power2.out",
            },
          ]}
        >
          <div className={styles.acresContainer}>
            <ST.Animation
              tween={{
                start: mapToGlobalProgress(index, 25),
                end: mapToGlobalProgress(index, 65),
                ease: "power2.out",
                to: {
                  yPercent: -600,
                },
              }}
            >
              <div className={styles.acresContainerInner}>
                {[...CONTENT.acresBurned].reverse().map((item, i) => (
                  <div className={styles.titleItem} key={`${item.acres}-${i}`}>
                    {item.acres}
                  </div>
                ))}
              </div>
            </ST.Animation>
            <p className={styles.acresBurnedText}>
              cumulative <br /> acres burned
            </p>
          </div>
        </ST.Animation>

        <ST.Waypoint
          at={mapToGlobalProgress(index, 80)}
          onCall={handleTextStart}
          onReverseCall={handleTextReverse}
        />
        <div className={`${styles.text}`}>
          <SplitTextBg ref={textRef} color="cream" inline>
            <h2>{CONTENT.text}</h2>
          </SplitTextBg>
        </div>
      </div>
    </div>
  );
}

const CONTENT = {
  sectionTitle: "Up In Smoke",
  title:
    "But right now, many of our forests exhibit declining health and resilience",
  image: {
    src: coloradoStateForestServiceImage,
    alt: "Alexander Mountain Fire, Colorado State Forest Service ",
  },
  acresBurned: [
    {
      year: "Today",
      acres: "4,073k",
    },
    {
      year: 2020,
      acres: "3,176k",
    },
    {
      year: 2015,
      acres: "2,395k",
    },
    {
      year: 2010,
      acres: "1,464k",
    },
    {
      year: 2005,
      acres: "957k",
    },
    {
      year: 2000,
      acres: "137k",
    },
    {
      year: 1995,
      acres: "27k",
    },
  ],
  text: "Colorado's top three largest wildfires all occurred in 2020. The next one is not a matter of if, it's a matter of when",
};
