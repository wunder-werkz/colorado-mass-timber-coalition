"use client";

import { useRef } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import { mapToGlobalProgress } from "../../utils";

export default function Tab3({ index, currentTab }) {
  const panelRef = useRef(null);

  return (
    <div
      ref={panelRef}
      className={`${styles.tabPanel} ${currentTab === index ? styles.active : ""}`}
    >
      {/* First animation: Title (0-33%) */}
      <ST.Animation
        tween={{
          start: mapToGlobalProgress(index, 0),
          end: mapToGlobalProgress(index, 33),
          fromTo: [
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0 },
          ],
          ease: "power2.out",
          reverse: true,
        }}
      >
        <h2 className={styles.title}>tab {index + 1}</h2>
      </ST.Animation>

      {/* Second animation: Description text (33-66%) */}
      <ST.Animation
        tween={{
          start: mapToGlobalProgress(index, 33),
          end: mapToGlobalProgress(index, 66),
          fromTo: [
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0 },
          ],
          ease: "power2.out",
          reverse: true,
        }}
      >
        <p className={styles.description}>animation 1 for tab {index + 1}</p>
      </ST.Animation>

      {/* Third animation: Final message (66-100%) */}
      <ST.Animation
        tween={{
          start: mapToGlobalProgress(index, 66),
          end: mapToGlobalProgress(index, 95),
          fromTo: [
            { opacity: 0, scale: 0.5, rotation: -15 },
            { opacity: 1, scale: 1, rotation: 0 },
          ],
          ease: "power2.out",
          reverse: true,
        }}
      >
        <div className={styles.finalMessage}>anim 2 for tab {index + 1}!</div>
      </ST.Animation>
    </div>
  );
}
