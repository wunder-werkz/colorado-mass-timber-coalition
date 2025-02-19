"use client";

import { useRef } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import SplitTextBg from "@/components/SplitTextBg";
import Stumpy from "@/components/Stumpy";

import { FullSvg } from "./SVGs";

export default function BuiltToLast() {
  const headline = useRef(null);
  const copy = useRef(null);
  const eyebrowRef = useRef(null);
  const svgRefs = useRef([null, null, null]);
  const stumpyTextRefs = useRef([null, null, null]);

  return (
    <ST.Root scrub="true" start="top top" end="bottom bottom">
      <ST.Pin childHeight={"100vh"} pinSpacerHeight={`400vh`} top={0}>
        <div className={`${styles.tabPanel}`}>
          <div className={styles.column}>
            <div>
              <ST.Waypoint
                at={1}
                onCall={() => eyebrowRef.current?.restart()}
                onReverseCall={() => eyebrowRef.current?.reverse()}
              />

              <div className={`${styles.eyebrow}`}>
                <SplitTextBg ref={eyebrowRef} color="orange" inline>
                  <h3>{CONTENT.eyebrow}</h3>
                </SplitTextBg>
              </div>

              <ST.Waypoint
                at={3}
                onCall={() => headline.current?.restart()}
                onReverseCall={() => headline.current?.reverse()}
              />

              <div className={`${styles.headline}`}>
                <SplitTextBg ref={headline} color="orange" inline>
                  <h3>{CONTENT.headline}</h3>
                </SplitTextBg>
              </div>
            </div>

            <ST.Waypoint
              at={8}
              onCall={() => copy.current?.restart()}
              onReverseCall={() => copy.current?.reverse()}
            />
            <div className={`${styles.copy}`}>
              <SplitTextBg ref={copy} color="orange">
                <p>{CONTENT.copy}</p>
              </SplitTextBg>
            </div>
          </div>

          <div className={`${styles.column} ${styles.column2}`}>
            <div className={styles.svgCircle}>
              <ST.Waypoint
                at={25}
                tween={{
                  target: ["#sustain"],
                  to: { opacity: 1 },
                  duration: 0.35,
                }}
              />
              <ST.Waypoint
                at={50}
                tween={{
                  target: ["#benefit"],
                  to: { opacity: 1 },
                  duration: 0.35,
                }}
              />
              <ST.Waypoint
                at={75}
                tween={{
                  target: ["#environment"],
                  to: { opacity: 1 },
                  duration: 0.35,
                }}
              />

              <FullSvg />
            </div>
            {CONTENT.svgText.map((content, index) => (
              <div
                key={index}
                className={`${styles.stumpyWrapper} ${styles[`stumpyWrapper-${index}`]}`}
              >
                <ST.Animation
                  tween={{
                    start: index * 25 + 25,
                    end: index * 25 + 30,
                    fromTo: [
                      { opacity: 0, scale: 0.2 },
                      { opacity: 1, scale: 1 },
                    ],
                    ease: "power2.out",
                  }}
                >
                  <div className={styles.stumpy}>
                    <Stumpy
                      type={
                        index === 0 ? "stump" : index === 1 ? "tree" : "plank"
                      }
                      color="forest"
                    />
                  </div>
                </ST.Animation>

                <ST.Waypoint
                  at={index * 25 + 25}
                  onCall={() => stumpyTextRefs.current[index]?.restart()}
                  onReverseCall={() => stumpyTextRefs.current[index]?.reverse()}
                />
                <div className={styles.stumpyText}>
                  <SplitTextBg
                    ref={(el) => (stumpyTextRefs.current[index] = el)}
                    color="cream"
                  >
                    <p>{content}</p>
                  </SplitTextBg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ST.Pin>
    </ST.Root>
  );
}

const CONTENT = {
  eyebrow: "Built to Last",
  headline: "Creating a community committed to a sustainable future",
  copy: "We've engaged stakeholders and experts across the entire value chain to build our vision for Colorado's sustainable future, one where healthy forests benefit everyone.",
  svgText: [
    "Sustainable Forest Management",
    "Forest Product Economy Benefits Local Communities",
    "Environmentally Friendly Mass Timber Construction",
  ],
};
