"use client";

import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

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

const TAB_COUNT = 6;
const SECTION_PERCENTAGE = 100 / TAB_COUNT;
const BUFFER = 1;

export default function TabPanel({ index, currentTab }) {
  const TabComponent = TABS_MAP[index];

  const start = index * SECTION_PERCENTAGE;
  const end = (index + 1) * SECTION_PERCENTAGE - BUFFER;

  if (!TabComponent) {
    console.error(`No component found for index: ${index}`);
    return null;
  }

  return (
    <>
      <ST.Animation
        tween={[
          {
            start: index === 0 ? start : start - BUFFER,
            end: start,
            fromTo: [
              {
                x: index === 0 ? 0 : "100%",
                opacity: 0,
                zIndex: 1,
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
            start: end,
            end: end + BUFFER,
            fromTo: [
              {
                x: 0,
                opacity: 1,
                zIndex: 1,
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
        <div className={styles.tabPanel}>
          <TabComponent index={index} currentTab={currentTab} />{" "}
        </div>
      </ST.Animation>
    </>
  );
}
