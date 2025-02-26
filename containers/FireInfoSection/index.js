"use client";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import Button from "./Button";

import { TAB_COUNT, TOTAL_SCROLL_HEIGHT } from "./utils";

import TabPanel from "./Sections";

const FireInfoSection = () => {
  return (
    <ST.Root
      scrub={true}
      start="top top"
      end="bottom bottom"
      callbacks={{
        refreshPriority: 2,
        normalizeScroll: true,
      }}
    >
      <ST.Pin
        childHeight={"100vh"}
        pinSpacerHeight={`${TOTAL_SCROLL_HEIGHT}vh`}
        top={0}
      >
        <div className={styles.container}>
          <nav className={styles.tabNav}>
            {Array.from({ length: TAB_COUNT }).map((_, i) => (
              <Button key={i} index={i} />
            ))}
          </nav>
          <div className={styles.tabContent}>
            {Array.from({ length: TAB_COUNT }).map((_, i) => (
              <TabPanel key={i} index={i} />
            ))}
          </div>
        </div>
      </ST.Pin>
    </ST.Root>
  );
};

export default FireInfoSection;
