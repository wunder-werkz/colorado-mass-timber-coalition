"use client";

import { useRef, useCallback } from "react";
import * as ST from "@bsmnt/scrollytelling";
import SplitTextBg from "@/components/SplitTextBg";
import { PortableText } from "@portabletext/react";
import styles from "./styles.module.scss";

export default function Partners({ partners, partnersText, title }) {
  const splitTextRef = useRef(null);
  const splitTextCopyRef = useRef(null);

  // Memoized callbacks for animations
  const handleSplitTextStart = useCallback(() => {
    splitTextRef.current?.restart();
  }, []);

  const handleSplitTextReverse = useCallback(() => {
    splitTextRef.current?.reverse();
  }, []);

  const handleSplitTextCopyStart = useCallback(() => {
    splitTextCopyRef.current?.restart();
  }, []);

  const handleSplitTextCopyReverse = useCallback(() => {
    splitTextCopyRef.current?.reverse();
  }, []);


  return (
    <ST.Root scrub={true} start="top center" end="bottom bottom">
      <div className={styles.container}>
        <ST.Waypoint
          at={1}
          onCall={handleSplitTextStart}
          onReverseCall={handleSplitTextReverse}
        />
        <ST.Waypoint
          at={1}
          onCall={handleSplitTextCopyStart}
          onReverseCall={handleSplitTextCopyReverse}
        />

        <div className={styles.titleWrapper}>
          <SplitTextBg ref={splitTextRef} color="orange" inline>
            <h2>{title ? title : "Our Financial Partners"}</h2>
          </SplitTextBg>
          {partnersText &&
            <SplitTextBg ref={splitTextCopyRef} color="cream" inline>
              <div className={styles.body}>
                <PortableText value={partnersText} />
              </div>
            </SplitTextBg>
          }
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
