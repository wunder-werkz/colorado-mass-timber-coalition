"use client";

import { useRef, useEffect } from "react";
import LogoLg from "@/components/SVG/LogoLg";
import Tagline from "@/components/SVG/Tagline";
import SplitTextBg from "@/components/SplitTextBg";
import styles from "./style.module.scss";
import * as ST from "@bsmnt/scrollytelling";

import Eyeballs from "@/components/Eyeballs";

const Hero = () => {
  const splitTextAnimationRef = useRef(null);
  const splitTextAnimationRef2 = useRef(null);

  return (
    <ST.Root scrub="true" start="top top" end="bottom bottom">
      <ST.Pin childHeight={"100vh"} pinSpacerHeight={"400vh"} top={0}>
        <section className={styles.hero} id="hero-section">
          <ST.Waypoint
            at={0}
            tween={{
              target: ".animate-refs",
              to: { y: 0, opacity: 1 },
              duration: 0.55,
              stagger: 0.1,
            }}
          />
          <ST.Waypoint
            at={0}
            tween={{
              target: ".mask-container",
              to: { clipPath: "circle(25% at 50% 100%)", opacity: 1, y: 0 },
              duration: 0.35,
              delay: 0.6,
            }}
          />

          <ST.Waypoint
            at={17}
            onCall={() => splitTextAnimationRef.current?.restart()}
            onReverseCall={() => splitTextAnimationRef.current?.reverse()}
          />

          <ST.Waypoint
            at={70}
            onCall={() => splitTextAnimationRef2.current?.restart()}
            onReverseCall={() => splitTextAnimationRef2.current?.reverse()}
          />

          <div className={styles.content}>
            <ST.Animation
              tween={{
                start: 30,
                end: 75,
                to: { y: "-150vh" },
              }}
            >
              <div className={`${styles.logoWrapper} animate-refs`}>
                <LogoLg />
              </div>
            </ST.Animation>

            <ST.Animation
              tween={{
                start: 5,
                end: 15,
                to: { y: 80, opacity: 0 },
              }}
            >
              <div className={`${styles.taglineWrapper} animate-refs`}>
                <Tagline />
              </div>
            </ST.Animation>

            <ST.Animation
              tween={{
                start: 30,
                end: 75,
                to: { y: "-150vh" },
              }}
            >
              <div className={`${styles.splitTextWrapper}`}>
                <SplitTextBg ref={splitTextAnimationRef} color="orange" inline>
                  lots of text lots of text lost of textlots of text lots of
                  text lost of textlots of text lots of text lost of text
                </SplitTextBg>
              </div>
            </ST.Animation>
          </div>

          <ST.Animation
            tween={{
              start: 25,
              end: 100,
              to: { clipPath: "circle(150% at 50% 100%)" },
            }}
          >
            <div className={`${styles.maskContainer} mask-container`}>
              <div className={styles.mask}>
                <div
                  className={`${styles.splitTextWrapper} ${styles.splitTextWrapper2}`}
                >
                  <SplitTextBg
                    ref={splitTextAnimationRef2}
                    color="orange"
                    inline
                  >
                    lots of text lots of text lost of textlots of text lots of
                    text lost of textlots of text lots of text lost of text
                  </SplitTextBg>
                </div>
              </div>
              <div className={styles.eyeballs}>
                <ST.Stagger
                  overlap={0.2}
                  tween={{
                    start: 50,
                    end: 60,
                    to: { opacity: 1, y: 0 },
                  }}
                >
                  <div className={styles.eyeball1}>
                    <Eyeballs />
                  </div>
                  <div className={styles.eyeball2}>
                    <Eyeballs />
                  </div>
                  <div className={styles.eyeball3}>
                    <Eyeballs />
                  </div>
                  <div className={styles.eyeball4}>
                    <Eyeballs />
                  </div>
                  <div className={styles.eyeball5}>
                    <Eyeballs />
                  </div>
                </ST.Stagger>
              </div>
            </div>
          </ST.Animation>
          <ST.Animation
            tween={{
              start: 60,
              end: 100,
              to: { y: "80px" },
            }}
          >
            <div className={styles.fireTrim}>
              <img src="/img/Fire_Trim.gif" alt="fire trim" />
            </div>
          </ST.Animation>
        </section>
      </ST.Pin>
    </ST.Root>
  );
};

export default Hero;
