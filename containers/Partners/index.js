"use client";

import { useRef } from "react";
import * as ST from "@bsmnt/scrollytelling";
import SplitTextBg from "@/components/SplitTextBg";
import styles from "./styles.module.scss";

export default function Partners({ partners }) {
  const splitTextRef = useRef(null);

  return (
    <ST.Root scrub="true" start="top center" end="bottom bottom">
      <div className={styles.container}>
        <ST.Waypoint
          at={1}
          onCall={() => splitTextRef.current?.restart()}
          onReverseCall={() => splitTextRef.current?.reverse()}
        />

        <div className={styles.titleWrapper}>
          <SplitTextBg ref={splitTextRef} color="orange" inline>
            <h2>Partners</h2>
          </SplitTextBg>
        </div>

        <div className={styles.partnersList}>
          <ST.Stagger
            overlap={0.2}
            tween={{
              start: 5,
              end: 90,
              fromTo: [
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0 },
              ],
            }}
          >
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.partnerItem}
              >
                {partner.name}
              </a>
            ))}
          </ST.Stagger>
        </div>
      </div>
    </ST.Root>
  );
}
