"use client";

import { useRef, useCallback } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import SplitTextBg from "@/components/SplitTextBg";
import Stumpy from "@/components/Stumpy";

import useWindowSize from "@/hooks/useWindowSize";

import { FullSvg } from "./SVGs";

export default function BuiltToLast() {
  const { width } = useWindowSize();
  const smScreen = width < 1080;

  const headline = useRef(null);
  const copy = useRef(null);
  const eyebrowRef = useRef(null);
  const stumpyTextRefs = useRef([null, null, null]);
  const finalCopyRef = useRef(null);

  // Memoized callbacks for animations
  const handleEyebrowStart = useCallback(() => {
    eyebrowRef.current?.restart();
  }, []);

  const handleEyebrowReverse = useCallback(() => {
    eyebrowRef.current?.reverse();
  }, []);

  const handleFinalCopyStart = useCallback(() => {
    finalCopyRef.current?.restart();
  }, []);

  const handleFinalCopyReverse = useCallback(() => {
    finalCopyRef.current?.reverse();
  }, []);

  return (
    <ST.Root
      scrub={true}
      start={smScreen ? "top 80%" : "top center"}
      end="bottom bottom"
      callbacks={{
        refreshPriority: 5,
      }}
    >
      <ST.Pin
        childHeight={smScreen ? "150vh" : "100vh"}
        pinSpacerHeight={smScreen ? `600vh` : `400vh`}
        top={smScreen ? "-50%" : "80px"}
      >
        <div className={`${styles.tabPanel}`}>
          <ST.Animation
            tween={{
              start: 60,
              end: 70,
              to: { xPercent: smScreen ? 0 : -100 },
            }}
          >
            <div className={styles.column}>
              <div>
                <ST.Waypoint
                  at={1}
                  onCall={handleEyebrowStart}
                  onReverseCall={handleEyebrowReverse}
                />

                <div className={`${styles.eyebrow}`}>
                  <SplitTextBg ref={eyebrowRef} color="orange" inline>
                    <p>{CONTENT.eyebrow}</p>
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
              to: { width: "100%", xPercent: smScreen ? 0 : -25 },
            }}
          >
            <div className={`${styles.column} ${styles.column2}`}>
              <ST.Animation
                tween={[
                  {
                    start: 16.666,
                    end: 60,
                    to: {
                      rotate: 360,
                      transformOrigin: "center center",
                    },
                  },
                  {
                    start: 60,
                    end: 100,
                    to: {
                      rotate: 540,
                      scale: smScreen ? 1.4 : 1.6,
                      top: smScreen ? "0%" : "-5%",
                      transformOrigin: "center center",
                    },
                  },
                ]}
              >
                <div className={styles.svgCircle}>
                  <div className={styles.svgCircleInner}>
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
                        color="cream"
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
                onCall={handleFinalCopyStart}
                onReverseCall={handleFinalCopyReverse}
              />

              <div className={styles.finalCopy}>
                <SplitTextBg ref={finalCopyRef} color="orange" body={true}>
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
                          color={index === 2 ? "orangeOrange" : "orange"}
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
