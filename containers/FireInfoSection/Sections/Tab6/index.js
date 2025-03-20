"use client";

import { useRef, useCallback } from "react";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";

import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";
import Stumpy from "@/components/Stumpy";

import useWindowSize from "@/hooks/useWindowSize";

import timberageImage from "@/public/img/tabs/Section06_TAS_2.jpg";

import { mapToGlobalProgress } from "../../utils";

export default function Tab6({ index }) {
  const { width } = useWindowSize();
  const smScreen = width < 1080;
  const phoneScreen = width < 900;

  const sectionTitleRef = useRef(null);
  const headlineRef = useRef(null);
  const copyT6Ref = useRef(null);
  const stumpTextT6Ref = useRef(null);

  // Memoized callbacks for animations
  const handleSectionTitleStart = useCallback(() => {
    sectionTitleRef.current?.restart();
  }, []);

  const handleSectionTitleReverse = useCallback(() => {
    sectionTitleRef.current?.reverse();
  }, []);

  const handleHeadlineStart = useCallback(() => {
    headlineRef.current?.restart();
  }, []);

  const handleHeadlineReverse = useCallback(() => {
    headlineRef.current?.reverse();
  }, []);

  const handleCopyStart = useCallback(() => {
    copyT6Ref.current?.restart();
  }, []);

  const handleCopyReverse = useCallback(() => {
    copyT6Ref.current?.reverse();
  }, []);

  const handleStumpTextStart = useCallback(() => {
    stumpTextT6Ref.current?.restart();
  }, []);

  const handleStumpTextReverse = useCallback(() => {
    stumpTextT6Ref.current?.reverse();
  }, []);

  return (
    <div className={`${styles.container}`}>
      <div className={styles.column}>
        <div>
          {smScreen && (
            <>
              <ST.Waypoint
                at={mapToGlobalProgress(index, 5)}
                onCall={handleSectionTitleStart}
                onReverseCall={handleSectionTitleReverse}
              />

              <ST.Waypoint
                at={mapToGlobalProgress(index, 40)}
                onCall={handleSectionTitleReverse}
                onReverseCall={handleSectionTitleStart}
              />

              <div className={`${styles.sectionTitle}`}>
                <SplitTextBg ref={sectionTitleRef} color="cream" inline>
                  <h2>{CONTENT.sectionTitle}</h2>
                </SplitTextBg>
              </div>
            </>
          )}

          {smScreen && (
            <>
              <ST.Waypoint
                at={mapToGlobalProgress(index, 40)}
                onCall={handleHeadlineReverse}
                onReverseCall={handleHeadlineStart}
              />
            </>
          )}
          <ST.Waypoint
            at={mapToGlobalProgress(index, 5)}
            onCall={handleHeadlineStart}
            onReverseCall={handleHeadlineReverse}
          />

          <div className={`${styles.headline}`}>
            <SplitTextBg ref={headlineRef} color="cream" inline>
              <h2>{CONTENT.headline}</h2>
            </SplitTextBg>
          </div>
        </div>

        <ST.Waypoint
          at={mapToGlobalProgress(index, phoneScreen ? 50 : 15)}
          onCall={handleCopyStart}
          onReverseCall={handleCopyReverse}
        />
        <div className={`${styles.copy}`}>
          <SplitTextBg ref={copyT6Ref} color="forest" body={true}>
            <p>
              Finding ways to use the wood generated from forest stewardship
              leads to lower costs for everyone and is a win-win for the
              environment and community. Plus, products like mass timber which
              can be used to help address our housing crisis, extend the carbon
              storage life of a tree, and reduce the environmental impact of new
              construction. 90% of the wood products Coloradans purchase and use
              everyday are imported.<sup> 2 </sup>
            </p>
          </SplitTextBg>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.scaleWrap}>
          <ST.Animation
            tween={{
              start: mapToGlobalProgress(index, 0),
              end: mapToGlobalProgress(index, 5),
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
              start: mapToGlobalProgress(index, phoneScreen ? 65 : 50),
              end: mapToGlobalProgress(index, phoneScreen ? 75 : 60),
              fromTo: [
                { opacity: 0, scale: 0.2 },
                { opacity: 1, scale: 1 },
              ],
              ease: "power2.out",
            }}
          >
            <div className={styles.stumpy}>
              <Stumpy type="plank" color="creamGreen" />
            </div>
          </ST.Animation>
          <ST.Waypoint
            at={mapToGlobalProgress(index, phoneScreen ? 70 : 65)}
            onCall={handleStumpTextStart}
            onReverseCall={handleStumpTextReverse}
          />
          <div className={`${styles.stumpyText}`}>
            <SplitTextBg
              ref={stumpTextT6Ref}
              color={phoneScreen ? "cream" : "forest"}
            >
              <p>{CONTENT.stumpText} </p>
            </SplitTextBg>
          </div>
        </div>
      </div>
    </div>
  );
}

const CONTENT = {
  sectionTitle: "How Can We Do It?",
  headline:
    "A forests products economy can both incentivize proactive stewardship and reduce forest management costs",
  image: {
    src: timberageImage,
    alt: "Timber Age Systems",
  },
  stumpText: "A local forest product economy helps benefit rural communities",
};
