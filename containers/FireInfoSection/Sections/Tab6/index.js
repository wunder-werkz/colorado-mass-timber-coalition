"use client";

import { useRef } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";
import Stumpy from "@/components/Stumpy";

import { mapToGlobalProgress } from "../../utils";

export default function Tab6({ index }) {
  const headlineT6Ref = useRef(null);
  const copyT6Ref = useRef(null);
  const stumpTextT6Ref = useRef(null);

  return (
    <div className={`${styles.tabPanel}`}>
      <div className={styles.column}>
        <ST.Waypoint
          at={mapToGlobalProgress(index, 1)}
          onCall={() => headlineT6Ref.current?.restart()}
          onReverseCall={() => headlineT6Ref.current?.reverse()}
        />

        <div className={`${styles.headline}`}>
          <SplitTextBg ref={headlineT6Ref} color="forest" inline>
            <h2>{CONTENT.headline}</h2>
          </SplitTextBg>
        </div>

        <ST.Waypoint
          at={mapToGlobalProgress(index, 8)}
          onCall={() => copyT6Ref.current?.restart()}
          onReverseCall={() => copyT6Ref.current?.reverse()}
        />
        <div className={`${styles.copy}`}>
          <SplitTextBg ref={copyT6Ref} color="orange">
            <p>{CONTENT.copy} </p>
          </SplitTextBg>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.scaleWrap}>
          <ST.Animation
            tween={{
              start: mapToGlobalProgress(index, 5),
              end: mapToGlobalProgress(index, 15),
              fromTo: [
                { scale: 1.1, filter: "blur(10px)" },
                { scale: 1, filter: "blur(0px)" },
              ],
              ease: "power2.out",
            }}
          >
            <div className={styles.mediaWCaption}>
              <MediaWCaption
                url={CONTENT.image.src}
                caption={CONTENT.image.alt}
              />
            </div>
          </ST.Animation>
        </div>

        <div className={styles.stumpyWrap}>
          <ST.Animation
            tween={{
              start: mapToGlobalProgress(index, 50),
              end: mapToGlobalProgress(index, 60),
              fromTo: [
                { opacity: 0, scale: 0.2 },
                { opacity: 1, scale: 1 },
              ],
              ease: "power2.out",
            }}
          >
            <div className={styles.stumpy}>
              <Stumpy type="plank" />
            </div>
          </ST.Animation>
          <ST.Waypoint
            at={mapToGlobalProgress(index, 60)}
            onCall={() => stumpTextT6Ref.current?.restart()}
            onReverseCall={() => stumpTextT6Ref.current?.reverse()}
          />
          <div className={`${styles.stumpyText}`}>
            <SplitTextBg ref={stumpTextT6Ref} color="forest">
              <p>{CONTENT.stumpText} </p>
            </SplitTextBg>
          </div>
        </div>
      </div>
    </div>
  );
}

const CONTENT = {
  headline:
    "A forests products economy can both incentivize proactive stewardship and reduce forest management costs",
  copy: "Finding ways to use the wood generated from forest stewardship leads to lower costs for everyone and is a win-win for the environment and community. Plus, products like mass timber which can be used to help address our housing crisis, extend the carbon storage life of a tree, and reduce the environmental impact of new construction.",
  image: {
    src: "/img/tabs/timberage.jpeg",
    alt: "Timber Age Systems",
  },
  stumpText: "A local forest product economy helps benefit rural communities",
};
