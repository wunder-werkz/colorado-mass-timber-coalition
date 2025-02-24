"use client";

import { useRef } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";

import { mapToGlobalProgress } from "../../utils";

export default function Tab1({ index }) {
  const titleRef = useRef(null);

  return (
    <div className={`${styles.container}`}>
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
      <div className={styles.mediaWCaption}>
        <MediaWCaption url={CONTENT.image.src} caption={CONTENT.image.alt} />
      </div>
    </div>
  );
}

const CONTENT = {
  title:
    "But right now, many of our forests exhibit declining health and resilience",
  image: {
    src: "/img/tabs/PineGulch.jpg",
    alt: "Pine Gulch Fire, Kyle Miller Photography",
  },
};
