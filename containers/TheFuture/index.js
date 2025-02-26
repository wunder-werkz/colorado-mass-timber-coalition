"use client";

import { useRef, useCallback } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import SplitTextBg from "@/components/SplitTextBg";

import useWindowSize from "@/hooks/useWindowSize";

import { CLTSvg, GLUSvg, NLTSvg, DLTSvg } from "./SVG";

export default function TheFuture() {
  const headline = useRef(null);
  const copy = useRef(null);
  const eyebrowRef = useRef(null);
  const cltRef = useRef(null);
  const gluRef = useRef(null);
  const nltRef = useRef(null);
  const dltRef = useRef(null);

  const { width } = useWindowSize();
  const smScreen = width < 1090;

  // Memoized callbacks for animations
  const handleEyebrowStart = useCallback(() => {
    eyebrowRef.current?.restart();
  }, []);

  const handleEyebrowReverse = useCallback(() => {
    eyebrowRef.current?.reverse();
  }, []);

  const handleCltStart = useCallback(() => {
    cltRef.current?.restart();
  }, []);

  const handleCltReverse = useCallback(() => {
    cltRef.current?.reverse();
  }, []);

  const handleGluStart = useCallback(() => {
    gluRef.current?.restart();
  }, []);

  const handleGluReverse = useCallback(() => {
    gluRef.current?.reverse();
  }, []);

  const handleNltStart = useCallback(() => {
    nltRef.current?.restart();
  }, []);

  const handleNltReverse = useCallback(() => {
    nltRef.current?.reverse();
  }, []);

  const handleDltStart = useCallback(() => {
    dltRef.current?.restart();
  }, []);

  const handleDltReverse = useCallback(() => {
    dltRef.current?.reverse();
  }, []);

  return (
    <ST.Root
      scrub={true}
      start="top 50%"
      end="top top"
      callbacks={{
        refreshPriority: 4,
        invalidateOnRefresh: true,
      }}
    >
      <div className={`${styles.container}`}>
        <div className={styles.column}>
          <div>
            <ST.Waypoint
              at={1}
              onCall={handleEyebrowStart}
              onReverseCall={handleEyebrowReverse}
            />
            <div className={`${styles.eyebrow}`}>
              <SplitTextBg ref={eyebrowRef} color="cream" inline>
                <h2>{CONTENT.eyebrow}</h2>
              </SplitTextBg>
            </div>

            <ST.Waypoint
              at={1}
              onCall={() => headline.current?.restart()}
              onReverseCall={() => headline.current?.reverse()}
            />

            <div className={`${styles.headline}`}>
              <SplitTextBg ref={headline} color="forest" inline>
                <h3>{CONTENT.headline}</h3>
              </SplitTextBg>
            </div>
          </div>

          <ST.Waypoint
            at={smScreen ? 10 : 80}
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
          <ST.Stagger
            overlap={0.2}
            tween={{
              start: 20,
              end: 70,
              fromTo: [
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0 },
              ],
            }}
          >
            <div className={styles.cltWrap}>
              <CLTSvg />
              <ST.Waypoint
                at={70}
                onCall={handleCltStart}
                onReverseCall={handleCltReverse}
              />
              <div className={`${styles.cltText}`}>
                <SplitTextBg ref={cltRef} color="forest">
                  <p>Cross-Laminated Timber (CLT) </p>
                </SplitTextBg>
              </div>
            </div>
            <div className={styles.gluWrap}>
              <ST.Waypoint
                at={70}
                onCall={handleGluStart}
                onReverseCall={handleGluReverse}
              />
              <div className={`${styles.gluText}`}>
                <SplitTextBg ref={gluRef} color="forest">
                  <p>Glue-Laminated Timber (glulam) </p>
                </SplitTextBg>
              </div>
              <GLUSvg />
            </div>
            <div className={styles.nltWrap}>
              <ST.Waypoint
                at={70}
                onCall={handleNltStart}
                onReverseCall={handleNltReverse}
              />
              <div className={`${styles.nltText}`}>
                <SplitTextBg ref={nltRef} color="forest">
                  <p>Nail-Laminated Timber (NLT) </p>
                </SplitTextBg>
              </div>
              <NLTSvg />
            </div>
            <div className={styles.dltWrap}>
              <ST.Waypoint
                at={70}
                onCall={handleDltStart}
                onReverseCall={handleDltReverse}
              />
              <div className={`${styles.dltText}`}>
                <SplitTextBg ref={dltRef} color="forest">
                  <p>Dowel-Laminated Timber (DLT) </p>
                </SplitTextBg>
              </div>
              <DLTSvg />
            </div>
          </ST.Stagger>
        </div>
      </div>
    </ST.Root>
  );
}

const CONTENT = {
  eyebrow: "The Future",
  headline: "Mass Timber is an innovative building material",
  copy: "Mass timber is a family of high-capacity engineered wood products that are often pre-manufactured and multilayered, forming solid beams, panels, and columns that can be used to replace structural concrete and steel in any type of building. These are a few examples.",
};
