"use client";
import * as ST from "@bsmnt/scrollytelling";
import { useRef, useCallback } from "react";
import styles from "./style.module.scss";

import { MediaWCaption } from "@/components/MediaWCaption";
import SplitTextBg from "@/components/SplitTextBg";
import Stumpy from "@/components/Stumpy";

import useWindowSize from "@/hooks/useWindowSize";

const WorldBuildingSection = () => {
  const panelRef = useRef(null);
  const headline = useRef(null);
  const copyRef = useRef(null);
  const endCopyHeadlineRef = useRef(null);
  const endCopyRef = useRef(null);
  const stumpTextRef = useRef(null);
  const eyebrowRef = useRef(null);

  const { width } = useWindowSize();
  const smScreen = width < 786;

  // Memoized callbacks for animations
  const handleEyebrowStart = useCallback(() => {
    eyebrowRef.current?.restart();
  }, []);

  const handleEyebrowReverse = useCallback(() => {
    eyebrowRef.current?.reverse();
  }, []);

  const handleEyebrowReverseAlt = useCallback(() => {
    eyebrowRef.current?.reverse();
  }, []);

  const handleEyebrowStartAlt = useCallback(() => {
    eyebrowRef.current?.restart();
  }, []);

  const handleCopyStart = useCallback(() => {
    copyRef.current?.restart();
  }, []);

  const handleCopyReverse = useCallback(() => {
    copyRef.current?.reverse();
  }, []);

  const handleCopyReverseAlt = useCallback(() => {
    copyRef.current?.reverse();
  }, []);

  const handleCopyStartAlt = useCallback(() => {
    copyRef.current?.restart();
  }, []);

  const handleStumpTextStart = useCallback(() => {
    stumpTextRef.current?.restart();
  }, []);

  const handleStumpTextReverse = useCallback(() => {
    stumpTextRef.current?.reverse();
  }, []);

  const handleStumpTextReverseAlt = useCallback(() => {
    stumpTextRef.current?.reverse();
  }, []);

  const handleStumpTextStartAlt = useCallback(() => {
    stumpTextRef.current?.restart();
  }, []);

  const handleEndCopyHeadlineStart = useCallback(() => {
    endCopyHeadlineRef.current?.restart();
  }, []);

  const handleEndCopyHeadlineReverse = useCallback(() => {
    endCopyHeadlineRef.current?.reverse();
  }, []);

  const handleEndCopyStart = useCallback(() => {
    endCopyRef.current?.restart();
  }, []);

  const handleEndCopyReverse = useCallback(() => {
    endCopyRef.current?.reverse();
  }, []);

  return (
    <ST.Root
      scrub={true}
      start="top top"
      end="bottom bottom"
      callbacks={{
        refreshPriority: 3,
        invalidateOnRefresh: true,
      }}
    >
      <ST.Pin childHeight={"100vh"} pinSpacerHeight={`500vh`} top={0}>
        <div className={styles.padWrap}>
          <div className={styles.container}>
            <div className={styles.mediaWCaption}>
              <MediaWCaption
                url={CONTENT.image.src}
                caption={CONTENT.image.alt}
              />
              <ST.Animation
                tween={{
                  start: 35,
                  end: 70,
                  fromTo: [{ bottom: "0%" }, { bottom: "100%" }],
                  ease: "power2.out",
                }}
              >
                <div className={styles.mediaWCaptionInner}></div>
              </ST.Animation>
            </div>
            <div ref={panelRef} className={`${styles.tabPanel}`}>
              <div className={styles.chartContainer}>
                {CONTENT.sqFt.map((item, i) => (
                  <div key={item.year} className={styles.chartBarItemWrapper}>
                    <div className={styles.chartBarItem}>
                      <div className={styles.chartLabel}>{item.year}</div>
                    </div>
                    {i !== CONTENT.sqFt.length - 1 && (
                      <div className={styles.dividerWrapper}>
                        <div className={styles.divider}></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.contentContainer}>
                <ST.Waypoint
                  at={5}
                  onCall={handleEyebrowStart}
                  onReverseCall={handleEyebrowReverse}
                />
                <ST.Waypoint
                  at={30}
                  onCall={handleEyebrowReverseAlt}
                  onReverseCall={handleEyebrowStartAlt}
                />
                <div className={`${styles.eyebrow}`}>
                  <SplitTextBg ref={eyebrowRef} color="orange" inline>
                    <h2>{CONTENT.eyebrow}</h2>
                  </SplitTextBg>
                </div>

                <ST.Waypoint
                  at={8}
                  onCall={() => headline.current?.restart()}
                  onReverseCall={() => headline.current?.reverse()}
                />
                <ST.Waypoint
                  at={25}
                  onCall={() => headline.current?.reverse()}
                  onReverseCall={() => headline.current?.restart()}
                />
                <div className={`${styles.headline}`}>
                  <SplitTextBg ref={headline} color="cream" inline>
                    <h3>{CONTENT.headline}</h3>
                  </SplitTextBg>
                </div>

                <ST.Waypoint
                  at={10}
                  onCall={handleCopyStart}
                  onReverseCall={handleCopyReverse}
                />
                <ST.Waypoint
                  at={25}
                  onCall={handleCopyReverseAlt}
                  onReverseCall={handleCopyStartAlt}
                />
                <div className={`${styles.copy}`}>
                  <SplitTextBg ref={copyRef} color="cream" body={true}>
                    <p>
                      From 2025 to 2050, the world is expected to add about 1.7
                      trillion square feet of new floor area to the global
                      building stock.<sup>11</sup>
                    </p>
                  </SplitTextBg>
                </div>

                <ST.Animation
                  tween={[
                    {
                      start: 25,
                      end: 35,
                      fromTo: [{ opacity: 0 }, { opacity: 1 }],
                      ease: "power2.out",
                    },
                    {
                      start: 75,
                      end: 85,
                      to: { opacity: 0 },
                      ease: "power2.out",
                    },
                  ]}
                >
                  <div className={styles.sqFtContainer}>
                    <ST.Animation
                      tween={{
                        start: 35,
                        end: 70,
                        ease: "power2.out",
                        to: {
                          yPercent: -300,
                        },
                      }}
                    >
                      <div className={styles.sqFtContainerInner}>
                        {[...CONTENT.sqFt].reverse().map((item, i) => (
                          <div
                            className={styles.sqFtItem}
                            key={`${item.sqFt}-${i}`}
                          >
                            {item.sqFt}
                          </div>
                        ))}
                      </div>
                    </ST.Animation>
                    <p className={styles.sqFtBurnedText}>Trillion sq ft.</p>
                  </div>
                </ST.Animation>

                <div className={styles.stumpyWrap}>
                  <ST.Animation
                    tween={[
                      {
                        start: 45,
                        end: 50,
                        fromTo: [
                          { opacity: 0, scale: 0 },
                          { opacity: 1, scale: 1 },
                        ],
                        ease: "power2.out",
                      },
                      {
                        start: 70,
                        end: 80,
                        to: { opacity: 0, scale: 0 },
                        ease: "power2.out",
                      },
                    ]}
                  >
                    <div className={styles.stumpy}>
                      <Stumpy type="plank" color="forest" />
                    </div>
                  </ST.Animation>
                  <ST.Waypoint
                    at={50}
                    onCall={handleStumpTextStart}
                    onReverseCall={handleStumpTextReverse}
                  />
                  <ST.Waypoint
                    at={72}
                    onCall={handleStumpTextReverseAlt}
                    onReverseCall={handleStumpTextStartAlt}
                  />
                  <div className={`${styles.stumpyText}`}>
                    <SplitTextBg
                      ref={stumpTextRef}
                      color="forest"
                      stumpy={true}
                    >
                      <p>{CONTENT.stumpy} </p>
                    </SplitTextBg>
                  </div>
                </div>
                <ST.Waypoint
                  at={85}
                  onCall={handleEndCopyHeadlineStart}
                  onReverseCall={handleEndCopyHeadlineReverse}
                >
                  <div className={styles.headline}>
                    <SplitTextBg ref={endCopyHeadlineRef} color="cream" inline>
                      <h3>
                        Mass timber is an immediate solution to help solve our
                        climate crisis
                      </h3>
                    </SplitTextBg>
                  </div>
                </ST.Waypoint>
                <ST.Waypoint
                  at={85}
                  onCall={handleEndCopyStart}
                  onReverseCall={handleEndCopyReverse}
                />
                <div className={`${styles.endCopy}`}>
                  <SplitTextBg ref={endCopyRef} color="cream" body={true}>
                    <p>
                      Less than a fraction of one percent of all buildings are
                      built with mass timber<sup>12</sup> and future demand can
                      be met sustainably.<sup>13 </sup>Building materials, like
                      concrete and steel, contribute 11% of total global
                      greenhouse gas emissions. <sup>14 </sup>
                    </p>
                  </SplitTextBg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ST.Pin>
    </ST.Root>
  );
};

export default WorldBuildingSection;

const CONTENT = {
  image: {
    src: "/img/worldbuilding/world-building.jpg",
    alt: "Mile High Stadium",
  },
  sqFt: [
    {
      year: 2050,
      sqFt: "1.7",
    },
    {
      year: 2040,
      sqFt: "1",
    },
    {
      year: 2030,
      sqFt: "0.3",
    },
    {
      year: 2025,
      sqFt: "0",
    },
  ],
  eyebrow: "The world is building…a lot",
  headline: "Wood is the only renewable building material at scale",

  stumpy:
    "That's the same as building 111 Mile High Stadiums every day for the next 25 years…go Broncos!",
};

const SVGDivider = () => {
  return (
    <svg
      width="1"
      height="34"
      viewBox="0 0 1 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0.5"
        y1="2.18557e-08"
        x2="0.499999"
        y2="33.9791"
        stroke="black"
      />
    </svg>
  );
};
