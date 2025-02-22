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
  const secondStumpRef = useRef([null, null, null]);
  const stumpyTextRefs = useRef([null, null, null]);
  const finalCopyRef = useRef(null);
  return (
    <ST.Root scrub="true" start="top center" end="bottom bottom">
      <ST.Pin childHeight={"100vh"} pinSpacerHeight={`400vh`} top={0}>
        <div className={`${styles.tabPanel}`}>
          <ST.Animation
            tween={{
              start: 60,
              end: 70,
              to: { xPercent: -100 },
            }}
          >
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
          </ST.Animation>

          <ST.Animation
            tween={{
              start: 60,
              end: 70,
              to: { width: "100%", xPercent: -20 },
            }}
          >
            <div className={`${styles.column} ${styles.column2}`}>
              <ST.Animation
                tween={[
                  {
                    start: 16.666,
                    end: 33.332,
                    to: { rotate: 120, transformOrigin: "center" },
                  },
                  {
                    start: 33.332,
                    end: 50,
                    to: { rotate: 240, transformOrigin: "center" },
                  },
                  {
                    start: 50,
                    end: 60,
                    to: { rotate: 360, transformOrigin: "center" },
                  },
                  {
                    start: 60,
                    end: 100,
                    to: { rotate: 540, transformOrigin: "center" },
                  },
                ]}
              >
                <div className={styles.svgCircle}>
                  <ST.Waypoint
                    at={16.666}
                    tween={{
                      target: ["#sustain"],
                      to: { opacity: 1 },
                      duration: 0.35,
                    }}
                  />
                  <ST.Waypoint
                    at={33.332}
                    tween={{
                      target: ["#benefit"],
                      to: { opacity: 1 },
                      duration: 0.35,
                    }}
                  />
                  <ST.Waypoint
                    at={50}
                    tween={{
                      target: ["#environment"],
                      to: { opacity: 1 },
                      duration: 0.35,
                    }}
                  />

                  <FullSvg />
                </div>
              </ST.Animation>
              {CONTENT.svgText.map((content, index) => (
                <div
                  key={index}
                  className={`${styles.stumpyWrapper} ${styles[`stumpyWrapper-${index}`]}`}
                >
                  <ST.Animation
                    tween={[
                      {
                        start: (index + 1) * 16.666,
                        end: (index + 1) * 16.666 + 5,
                        to: { opacity: 1, scale: 1 },

                        ease: "power2.out",
                      },
                      {
                        start: 60,
                        end: 70,
                        to: { opacity: 0, scale: 0.2 },
                        ease: "power2.out",
                      },
                    ]}
                  >
                    <div className={styles.stumpy}>
                      <Stumpy
                        type={
                          index === 0 ? "tree" : index === 1 ? "stump" : "plank"
                        }
                        color="forest"
                      />
                    </div>
                  </ST.Animation>
                  <ST.Waypoint
                    at={(index + 1) * 16.666}
                    onCall={() => stumpyTextRefs.current[index]?.restart()}
                    onReverseCall={() =>
                      stumpyTextRefs.current[index]?.reverse()
                    }
                  />
                  <ST.Waypoint
                    at={60}
                    onCall={() => stumpyTextRefs.current[index]?.reverse()}
                    onReverseCall={() =>
                      stumpyTextRefs.current[index]?.restart()
                    }
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

              <ST.Waypoint
                at={80}
                onCall={() => finalCopyRef.current?.restart()}
                onReverseCall={() => finalCopyRef.current?.reverse()}
              />

              <div className={styles.finalCopy}>
                <SplitTextBg ref={finalCopyRef} color="orange" inline>
                  <p>{CONTENT.finalCopy}</p>
                </SplitTextBg>
              </div>

              <div className={styles.secondStumpWrapper}>
                {CONTENT.svgText.map((content, index) => (
                  <div
                    key={index}
                    className={`${styles.stumpyWrapper} ${styles[`stumpyWrapper-${index}`]}`}
                  >
                    <ST.Animation
                      tween={[
                        {
                          start: 70,
                          end: 80,
                          fromTo: [
                            { opacity: 0, scale: 0.2 },
                            { opacity: 1, scale: 1 },
                          ],
                          ease: "power2.out",
                        },
                      ]}
                    >
                      <div className={styles.stumpy}>
                        <Stumpy
                          type={
                            index === 0
                              ? "tree"
                              : index === 1
                                ? "stump"
                                : "plank"
                          }
                          color="orange"
                        />
                      </div>
                    </ST.Animation>
                  </div>
                ))}
              </div>
            </div>
          </ST.Animation>
        </div>
      </ST.Pin>
    </ST.Root>
  );
}

const CONTENT = {
  eyebrow: "Built to Last",
  headline: "Creating a community committed to a sustainable future",
  copy: "We've engaged stakeholders and experts across the entire value chain to build our vision for Colorado's sustainable future, one where healthy forests benefit everyone.",
  finalCopy:
    "Mass timber is a triple win for forest and watershed health, local communities, and the built environment.",
  svgText: [
    "Sustainable Forest Management",
    "Forest Product Economy Benefits Local Communities",
    "Environmentally Friendly Mass Timber Construction",
  ],
};
