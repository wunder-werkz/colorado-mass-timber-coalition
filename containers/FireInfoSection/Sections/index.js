"use client";

import * as ST from "@bsmnt/scrollytelling";
import { useRef } from "react";
import styles from "./style.module.scss";
import { getSectionStartPosition } from "../utils";

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

const SCROLLTO = [0.1, 5, 1, 1, 1, 1];

export default function TabPanel({ index }) {
  const tabRef = useRef(null);
  const TabComponent = TABS_MAP[index];

  if (!TabComponent) {
    console.error(`No component found for index: ${index}`);
    return null;
  }

  const start = getSectionStartPosition(index);

  return (
    <div
      key={`tab-${index}`}
      ref={tabRef}
      className={`${styles.tabPanel} tab-${index}`}
      style={{
        transform: "translateX(100%)",
        zIndex: 0,
        opacity: 0,
      }}
    >
      <ST.Waypoint
        at={start}
        tween={{
          target: `.tab-${index}`,
          to: {
            opacity: 1,
            x: 0,
            zIndex: 1,
            filter: "blur(0px)",
          },
          duration: 0.5,
          ease: "power2.inOut",
        }}
      />
      <ST.Waypoint at={start + SCROLLTO[index]} label={`tabPanel-${index}`} />
      <TabComponent index={index} />
    </div>
  );
}
