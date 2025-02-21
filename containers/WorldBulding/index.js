"use client";
import * as ST from "@bsmnt/scrollytelling";
import { useRef } from "react";
import styles from "./style.module.scss";

import { MediaWCaption } from "@/components/MediaWCaption";
import SplitTextBg from "@/components/SplitTextBg";
import Stumpy from "@/components/Stumpy";

const WorldBuildingSection = () => {
  const panelRef = useRef(null);
  const headline = useRef(null);
  const copyRef = useRef(null);
  const endCopyRef = useRef(null);
  const stumpTextRef = useRef(null);
  const eyebrowRef = useRef(null);

  return (
    <ST.Root scrub="true" start="top top" end="bottom bottom">
      <ST.Pin childHeight={"100vh"} pinSpacerHeight={`400vh`} top={0}>
        <div className={styles.padWrap}>
          <div className={styles.container}>
            <div className={styles.mediaWCaption}>
              <MediaWCaption
                url={CONTENT.image.src}
                caption={CONTENT.image.alt}
              />
              <ST.Animation
                tween={{
                  start: 25,
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
                    {i !== CONTENT.sqFt.length - 1 && <SVGDivider />}
                  </div>
                ))}
              </div>

              <div className={styles.contentContainer}>
                <ST.Waypoint
                  at={1}
                  onCall={() => eyebrowRef.current?.restart()}
                  onReverseCall={() => eyebrowRef.current?.reverse()}
                />
                <ST.Waypoint
                  at={15}
                  onCall={() => eyebrowRef.current?.reverse()}
                  onReverseCall={() => eyebrowRef.current?.restart()}
                />
                <div className={`${styles.eyebrow}`}>
                  <SplitTextBg ref={eyebrowRef} color="orange" inline>
                    <h2>{CONTENT.eyebrow}</h2>
                  </SplitTextBg>
                </div>

                <ST.Waypoint
                  at={2}
                  onCall={() => headline.current?.restart()}
                  onReverseCall={() => headline.current?.reverse()}
                />
                <ST.Waypoint
                  at={15}
                  onCall={() => headline.current?.reverse()}
                  onReverseCall={() => headline.current?.restart()}
                />
                <div className={`${styles.headline}`}>
                  <SplitTextBg ref={headline} color="cream" inline>
                    <h3>{CONTENT.headline}</h3>
                  </SplitTextBg>
                </div>

                <ST.Waypoint
                  at={2}
                  onCall={() => copyRef.current?.restart()}
                  onReverseCall={() => copyRef.current?.reverse()}
                />
                <ST.Waypoint
                  at={15}
                  onCall={() => copyRef.current?.reverse()}
                  onReverseCall={() => copyRef.current?.restart()}
                />
                <div className={`${styles.copy}`}>
                  <SplitTextBg ref={copyRef} color="cream" inline>
                    <h3>{CONTENT.copy}</h3>
                  </SplitTextBg>
                </div>

                <ST.Animation
                  tween={[
                    {
                      start: 20,
                      end: 25,
                      fromTo: [
                        { opacity: 0, height: 0 },
                        { opacity: 1, height: "120px" },
                      ],
                      ease: "power2.out",
                    },
                    {
                      start: 70,
                      end: 80,
                      to: { opacity: 0, height: 0 },
                      ease: "power2.out",
                    },
                  ]}
                >
                  <div className={styles.sqFtContainer}>
                    <ST.Animation
                      tween={{
                        start: 25,
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
                        start: 40,
                        end: 50,
                        fromTo: [
                          { opacity: 0, scale: 0 },
                          { opacity: 1, scale: 1 },
                        ],
                        ease: "power2.out",
                      },
                      {
                        start: 60,
                        end: 70,
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
                    at={40}
                    onCall={() => stumpTextRef.current?.restart()}
                    onReverseCall={() => stumpTextRef.current?.reverse()}
                  />
                  <ST.Waypoint
                    at={60}
                    onCall={() => stumpTextRef.current?.reverse()}
                    onReverseCall={() => stumpTextRef.current?.restart()}
                  />
                  <div className={`${styles.stumpyText}`}>
                    <SplitTextBg ref={stumpTextRef} color="forest">
                      <p>{CONTENT.stumpy} </p>
                    </SplitTextBg>
                  </div>
                </div>

                <ST.Waypoint
                  at={70}
                  onCall={() => endCopyRef.current?.restart()}
                  onReverseCall={() => endCopyRef.current?.reverse()}
                />
                <ST.Waypoint
                  at={95}
                  onCall={() => endCopyRef.current?.reverse()}
                  onReverseCall={() => endCopyRef.current?.restart()}
                />
                <div className={`${styles.endCopy}`}>
                  <SplitTextBg ref={endCopyRef} color="cream" inline>
                    <h2>{CONTENT.endCopy}</h2>
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
  copy: "From 2025 to 2050, the world is expected to add about 1.7 trillion square feet of new floor area to the global building stock.11",
  endCopy:
    "Less than a fraction of one percent of all buildings are built with mass timber12 and future demand can be met sustainably.13 Mass timber is an immediate solution to help solve our climate crisis for which building materials, like concrete and steel, contribute 11% of total global greenhouse gas emissions.14",
  stumpy:
    "That’s the same as building 111 Mile High Stadiums every day for the next 25 years…go Broncos!",
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
