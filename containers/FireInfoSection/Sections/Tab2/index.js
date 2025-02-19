"use client";

import { useRef } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import { MediaWCaption } from "@/components/MediaWCaption";
import SplitTextBg from "@/components/SplitTextBg";

import { mapToGlobalProgress } from "../../utils";
export default function Tab2({ index }) {
  const panelRef = useRef(null);
  const textRef = useRef(null);
  return (
    <div ref={panelRef} className={`${styles.tabPanel}`}>
      <div className={styles.chartContainer}>
        {CONTENT.acresBurned.map((item, i) => (
          <div key={item.year} className={styles.chartBarItemWrapper}>
            <div className={styles.chartBarItem}>
              <div className={styles.chartBarItemYear}>{item.year}</div>
            </div>
            {i !== CONTENT.acresBurned.length - 1 && <SVGDivider />}
          </div>
        ))}
      </div>

      <div className={styles.contentContainer}>
        <ST.Animation
          tween={{
            start: mapToGlobalProgress(index, 15),
            end: mapToGlobalProgress(index, 25),
            fromTo: [
              { scale: 1.3, filter: "blur(10px)" },
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
            <ST.Animation
              tween={{
                start: mapToGlobalProgress(index, 25),
                end: mapToGlobalProgress(index, 90),
                fromTo: [{ height: 0 }, { height: "100%" }],
                ease: "power2.out",
              }}
            >
              <div className={styles.mediaWCaptionInner}></div>
            </ST.Animation>
          </div>
        </ST.Animation>

        <ST.Animation
          tween={[
            {
              start: mapToGlobalProgress(index, 15),
              end: mapToGlobalProgress(index, 25),
              fromTo: [
                { opacity: 0, height: 0 },
                { opacity: 1, height: "120px" },
              ],
              ease: "power2.out",
            },
            {
              start: mapToGlobalProgress(index, 80),
              end: mapToGlobalProgress(index, 90),
              to: { opacity: 0, height: 0 },
              ease: "power2.out",
            },
          ]}
        >
          <div className={styles.acresContainer}>
            <ST.Animation
              tween={{
                start: mapToGlobalProgress(index, 30),
                end: mapToGlobalProgress(index, 90),
                ease: "power2.out",
                to: {
                  yPercent: -700,
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
            <p className={styles.acresBurnedText}>acres burned</p>
          </div>
        </ST.Animation>

        <ST.Waypoint
          at={mapToGlobalProgress(index, 90)}
          onCall={() => textRef.current?.restart()}
          onReverseCall={() => textRef.current?.reverse()}
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
  title:
    "But right now, many of our forests exhibit declining health and resilience",
  image: {
    src: "/images/fire-info-section/tab1.jpg",
    alt: "Alexander Mountain Fire, <br/>Colorado State Forest Service ",
  },
  acresBurned: [
    {
      year: "Today",
      acres: "820k",
    },
    {
      year: 2020,
      acres: "820k",
    },
    {
      year: 2015,
      acres: "530k",
    },
    {
      year: 2010,
      acres: "478k",
    },
    {
      year: 2005,
      acres: "130k",
    },
    {
      year: 2000,
      acres: "450k",
    },
    {
      year: 1995,
      acres: "27k",
    },
    {
      year: 1990,
      acres: "37k",
    },
  ],
  text: "Colorado’s top three largest wildfires all occurred in 2020. The next one is not a matter of if, it’s a matter of when",
};

const SVGDivider = () => {
  return (
    <svg
      width="1"
      height="34"
      viewBox="0 0 1 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0.5"
        y1="2.18557e-08"
        x2="0.499999"
        y2="33.9791"
        stroke="black"
      />
    </svg>
  );
};
