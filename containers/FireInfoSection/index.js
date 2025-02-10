"use client";

import { useRef, useState, useEffect } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import TabPanel from "./Sections";

const TAB_COUNT = 6;
const SECTION_PERCENTAGE = 100 / TAB_COUNT; // Each section is ~16.67%

const FireInfoSection = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const containerRef = useRef(null);

  return (
    <ST.Root scrub="true" start="top top" end="bottom bottom">
      <ST.Pin childHeight={"90vh"} pinSpacerHeight={"1200vh"} top={0}>
        <div className={styles.container} ref={containerRef}>
          <nav className={styles.tabNav}>
            {Array.from({ length: TAB_COUNT }).map((_, i) => (
              <button
                key={i}
                className={currentTab === i ? styles.active : ""}
                onClick={() => setCurrentTab(i)}
              >
                Tab {i + 1}
              </button>
            ))}
          </nav>
          <div className={styles.tabContent}>
            {Array.from({ length: TAB_COUNT }).map((_, i) => (
              <TabPanel key={i} index={i} currentTab={currentTab} />
            ))}
          </div>

          <ST.Waypoint at={0} onCall={() => setCurrentTab(0)} />
          {Array.from({ length: TAB_COUNT - 1 }).map((_, i) => (
            <ST.Waypoint
              key={i}
              at={(i + 1) * SECTION_PERCENTAGE}
              onCall={() => setCurrentTab(i + 1)}
              onReverseCall={() => setCurrentTab(i)}
            />
          ))}
        </div>
      </ST.Pin>
    </ST.Root>
  );
};

export default FireInfoSection;
