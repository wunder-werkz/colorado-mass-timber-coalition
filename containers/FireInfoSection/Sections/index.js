"use client";

import * as ST from "@bsmnt/scrollytelling";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import styles from "./style.module.scss";
import {
  TAB_COUNT,
  SECTION_HEIGHTS,
  SECTION_BUFFER,
  TOTAL_SCROLL_HEIGHT,
  getSectionStartPosition,
  getTabTriggerPoint,
  mapToGlobalProgress,
} from "../utils";

import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Tab4 from "./Tab4";
import Tab5 from "./Tab5";
import Tab6 from "./Tab6";

const TABS_MAP = {
  0: Tab1,
  1: Tab2,
  2: Tab3,
  3: Tab4,
  4: Tab5,
  5: Tab6,
};

export default function TabPanel({ index }) {
  const tabRef = useRef(null);
  const TabComponent = TABS_MAP[index];

  useEffect(() => {
    if (tabRef.current) {
      gsap.set(tabRef.current, { x: "100%", opacity: 0 });
    }
  }, []);

  const initialAnimation = {
    start: mapToGlobalProgress(index, 0),
    end: mapToGlobalProgress(index, 20),
  };

  const exitAnimation = {
    start: mapToGlobalProgress(index, 80),
    end: mapToGlobalProgress(index, 100),
  };

  if (!TabComponent) {
    console.error(`No component found for index: ${index}`);
    return null;
  }

  return (
    <>
      <ST.Animation
        tween={[
          {
            start: initialAnimation.start,
            end: initialAnimation.end,
            fromTo: [
              {
                x: "100%",
                opacity: 0,
                zIndex: 1,
                pointerEvents: "none",
              },
              {
                x: 0,
                opacity: 1,
                zIndex: 1,
                pointerEvents: "auto",
              },
            ],
            ease: "expo.inOut",
          },
          {
            start: exitAnimation.start,
            end: exitAnimation.end,
            fromTo: [
              {
                x: 0,
                opacity: 1,
                zIndex: 1,
                pointerEvents: "auto",
              },
              {
                x: "-100%",
                opacity: 0,
                zIndex: 0,
                pointerEvents: "none",
              },
            ],
            ease: "expo.inOut",
          },
        ]}
      >
        <div ref={tabRef} className={styles.tabPanel}>
          <TabComponent index={index} />
        </div>
      </ST.Animation>
    </>
  );
}
