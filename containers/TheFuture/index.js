"use client";

import { useRef } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import SplitTextBg from "@/components/SplitTextBg";

import { CLTSvg, GLUSvg, NLTSvg, DLTSvg } from "./SVG";

export default function TheFuture() {
  const headline = useRef(null);
  const copy = useRef(null);

  const cltRef = useRef(null);
  const gluRef = useRef(null);
  const nltRef = useRef(null);
  const dltRef = useRef(null);

  return (
    <ST.Root scrub="true" start="top 50%" end="top top">
      <div className={`${styles.container}`}>
        <div className={styles.column}>
          <div>
            <div className={styles.eyebrow}>
              <ST.Animation
                tween={[
                  {
                    start: 0,
                    end: 5,
                    fromTo: [{ y: "200%" }, { y: "0" }],
                    ease: "power2.out",
                  },
                ]}
              >
                <h2>{CONTENT.eyebrow}</h2>
              </ST.Animation>
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
            at={80}
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
                onCall={() => cltRef.current?.restart()}
                onReverseCall={() => cltRef.current?.reverse()}
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
                onCall={() => gluRef.current?.restart()}
                onReverseCall={() => gluRef.current?.reverse()}
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
                onCall={() => nltRef.current?.restart()}
                onReverseCall={() => nltRef.current?.reverse()}
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
                onCall={() => dltRef.current?.restart()}
                onReverseCall={() => dltRef.current?.reverse()}
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
