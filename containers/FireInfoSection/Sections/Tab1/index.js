"use client";

import { useRef } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";

import useWindowSize from "@/hooks/useWindowSize";

import { mapToGlobalProgress } from "../../utils";

export default function Tab1({ index }) {
  const { width } = useWindowSize();
  const smScreen = width < 1080;
  const sectionTitleRef = useRef(null);
  const titleRef = useRef(null);

  return (
    <div className={`${styles.container}`}>
      <div className={styles.titleWrap}>
        {smScreen && (
          <>
            <ST.Waypoint
              at={mapToGlobalProgress(index, 1)}
              onCall={() => sectionTitleRef.current?.restart()}
              onReverseCall={() => sectionTitleRef.current?.reverse()}
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
          onCall={() => titleRef.current?.restart()}
          onReverseCall={() => titleRef.current?.reverse()}
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
    </div>
  );
}

const CONTENT = {
  sectionTitle: "The State Of Our Forests",
  title:
    "But right now, many of our forests exhibit declining health and resilience",
  image: {
    src: "/img/tabs/PineGulch.jpg",
    alt: "Pine Gulch Fire, Kyle Miller Photography",
  },
};
