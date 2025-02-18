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
    <div className={`${styles.tabPanel}`}>
      <ST.Waypoint
        at={1}
        onCall={() => titleRef.current?.restart()}
        onReverseCall={() => titleRef.current?.reverse()}
      />

      <div className={`${styles.title}`}>
        <SplitTextBg ref={titleRef} color="cream" inline>
          <h2 className={styles.title}>{CONTENT.title}</h2>
        </SplitTextBg>
      </div>

      {/* <ST.Animation
        tween={{
          start: mapToGlobalProgress(index, 1),
          end: mapToGlobalProgress(index, 5),
          fromTo: [
            { scale: 1.1, filter: "blur(10px)" },
            { scale: 1, filter: "blur(0px)" },
          ],
          ease: "power2.out",
        }}
      > */}
      <div className={styles.mediaWCaption}>
        <MediaWCaption
          url="/img/hero.jpeg"
          caption={"Building better starts with creating healthy forests"}
        />
      </div>
      {/* </ST.Animation> */}
    </div>
  );
}

const CONTENT = {
  title:
    "But right now, many of our forests exhibit declining health and resilience",
  image: {
    src: "/images/fire-info-section/tab1.jpg",
    alt: "Pine Gulch Fire, Kyle Miller Photography",
  },
};
