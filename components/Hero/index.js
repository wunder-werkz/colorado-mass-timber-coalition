"use client";

import { useRef, useEffect } from "react";
import * as ST from "@bsmnt/scrollytelling";

import Eyeballs from "@/components/Eyeballs";
import LogoLg from "@/components/SVG/LogoLg";
import { MediaWCaption } from "@/components/MediaWCaption";
import SplitTextBg from "@/components/SplitTextBg";
import Tagline from "@/components/SVG/Tagline";

import styles from "./style.module.scss";

const Hero = () => {
  const splitTextAnimationRef = useRef(null);
  const splitTextAnimationRef2 = useRef(null);

  return (
    <ST.Root scrub="true" start="top top" end="bottom bottom">
      <ST.Pin childHeight={"100vh"} pinSpacerHeight={"600vh"} top={0}>
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
            at={8}
            onCall={() => splitTextAnimationRef.current?.restart()}
          />
          <ST.Waypoint
            at={20}
            onReverseCall={() => splitTextAnimationRef.current?.reverse()}
          />

          <ST.Waypoint
            at={50}
            onCall={() => splitTextAnimationRef2.current?.restart()}
            onReverseCall={() => splitTextAnimationRef2.current?.reverse()}
          />

          <div className={styles.content}>
            <ST.Animation
              tween={{
                start: 26,
                end: 50,
                to: { y: "-90vh" },
              }}
            >
              <div className={`${styles.logoWrapper} animate-refs`}>
                <LogoLg />
              </div>
            </ST.Animation>

            <ST.Animation
              tween={{
                start: 5,
                end: 8,
                to: { y: 80, opacity: 0 },
              }}
            >
              <div className={`${styles.taglineWrapper} animate-refs`}>
                <Tagline />
              </div>
            </ST.Animation>

            <ST.Animation
              tween={{
                start: 26,
                end: 50,
                to: { y: "-110vh" },
              }}
            >
              <div className={`${styles.splitTextWrapper}`}>
                <SplitTextBg ref={splitTextAnimationRef} color="orange" inline>
                  <p>
                    Supporting <i>healthy, resilient forests</i> through a{" "}
                    <i>vibrant forest-products economy</i> including{" "}
                    <i>mass timber</i>
                  </p>
                </SplitTextBg>
              </div>
            </ST.Animation>
          </div>

          <ST.Animation
            tween={[
              {
                start: 5,
                end: 20,
                to: { top: 80 },
              },
              {
                start: 19.5,
                end: 75,
                to: {
                  clipPath: "circle(110% at 50% 100%)",
                  height: "calc(100% - 120px)",
                },
              },
            ]}
          >
            <div className={`${styles.maskContainer} mask-container`}>
              <div className={styles.mask}>
                <ST.Animation
                  tween={{
                    start: 25.5,
                    end: 60,
                    to: { top: 0, scale: 1 },
                  }}
                >
                  <div className={styles.mediaWCaption}>
                    <MediaWCaption
                      url="/img/hero.jpeg"
                      caption={
                        "Building better starts with creating healthy forests"
                      }
                    />
                  </div>
                </ST.Animation>
                <div
                  className={`${styles.splitTextWrapper} ${styles.splitTextWrapper2}`}
                >
                  <SplitTextBg
                    ref={splitTextAnimationRef2}
                    color="orange"
                    inline
                  >
                    <p>Building better starts with creating healthy forests</p>
                  </SplitTextBg>
                </div>
              </div>
              <div className={styles.eyeballs}>
                <ST.Stagger
                  overlap={0.2}
                  tween={{
                    start: 45,
                    end: 50,
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
              start: 70,
              end: 90,
              to: { y: -40 },
              ease: "power2.out",
            }}
          >
            <div className={styles.fireTrim}>
              <MediaWCaption
                url="/img/Fire_Trim.gif"
                caption={"Building better starts with creating healthy forests"}
              />
            </div>
          </ST.Animation>
        </section>
      </ST.Pin>
    </ST.Root>
  );
};

export default Hero;
