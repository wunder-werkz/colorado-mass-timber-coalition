"use client";

import * as ST from "@bsmnt/scrollytelling";
import { useRef } from "react";
import styles from "./style.module.scss";
import { mapToTransitionProgress } from "../utils";

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

  if (!TabComponent) {
    console.error(`No component found for index: ${index}`);
    return null;
  }

  return (
    <>
      <ST.Animation
        tween={[
          {
            start: mapToTransitionProgress(index, 0),
            end: mapToTransitionProgress(index, 100),
            fromTo: [
              {
                x: "100%",
                filter: "blur(10px)",
                pointerEvents: "none",
              },
              {
                x: "0%",
                filter: "blur(0px)",
                pointerEvents: "auto",
              },
            ],
            ease: "power2.inOut",
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
