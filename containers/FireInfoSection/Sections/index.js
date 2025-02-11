"use client";

import * as ST from "@bsmnt/scrollytelling";
import { useRef } from "react";
import styles from "./style.module.scss";
import { mapToGlobalProgress } from "../utils";

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

  const initialAnimation = {
    start: mapToGlobalProgress(
      index === 0 ? 0 : index - 1,
      index === 0 ? 0 : 90
    ),
    end: mapToGlobalProgress(
      index === 0 ? 0 : index - 1,
      index === 0 ? 20 : 100
    ),
  };

  const exitAnimation = {
    start: mapToGlobalProgress(index, 90),
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
                pointerEvents: "none",
              },
              {
                x: 0,
                pointerEvents: "auto",
              },
            ],
            ease: "expo.inOut",
          },
        ]}
      >
        <div ref={tabRef} className={styles.tabPanel}>
          <ST.Animation
            tween={[
              {
                start: exitAnimation.start,
                end: exitAnimation.end,
                fromTo: [
                  {
                    opacity: 1,
                    pointerEvents: "auto",
                  },
                  {
                    opacity: 0.8,
                    filter: "blur(10px)",
                    pointerEvents: "none",
                  },
                ],
                ease: "expo.inOut",
              },
            ]}
          >
            <div className={styles.tabContent}>
              <TabComponent index={index} />
            </div>
          </ST.Animation>
        </div>
      </ST.Animation>
    </>
  );
}
