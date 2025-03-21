"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import * as ST from "@bsmnt/scrollytelling";
import heroImage from "@/public/img/hero.jpg";
import fireTrimGif from "@/public/img/Fire_Trim.gif";

import Eyeballs from "@/components/Eyeballs";
import LogoLg from "@/components/SVG/LogoLg";
import { MediaWCaption } from "@/components/MediaWCaption";
import SplitTextBg from "@/components/SplitTextBg";
import Tagline from "@/components/SVG/Tagline";

import useWindowSize from "@/hooks/useWindowSize";
import { gsap } from "@/lib/gsapConfig";

import styles from "./style.module.scss";

const Hero = () => {
  const splitTextAnimationRef = useRef(null);
  const splitTextAnimationRef2 = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const animateRefsRef = useRef([]);
  const maskContainerRef = useRef(null);
  const fireTrimRef = useRef(null);
  const heroSectionRef = useRef(null);
  const mediaWCaptionRef = useRef(null);
  const { width, height } = useWindowSize();
  const isMobile = width < 768;
  const tabletView = height > width;

  // Memoized callbacks for animations to improve performance
  const handleSplitText1Animation = useCallback(() => {
    splitTextAnimationRef.current?.restart();
  }, []);

  const handleSplitText1Reverse = useCallback(() => {
    splitTextAnimationRef.current?.reverse();
  }, []);

  const handleSplitText2Animation = useCallback(() => {
    splitTextAnimationRef2.current?.restart();
  }, []);

  const handleSplitText2Reverse = useCallback(() => {
    splitTextAnimationRef2.current?.reverse();
  }, []);

  useEffect(() => {
    const duration = isMobile ? 0.4 : 0.55;

    gsap.set(".animate-refs", { y: -100, opacity: 0 });
    gsap.set(maskContainerRef.current, {
      y: 50,
      clipPath:
        isMobile || tabletView
          ? "circle(25% at 50% 60%)"
          : "circle(33vh at 50% 100%)",
      opacity: 1,
    });

    const initialAnimations = gsap.timeline({ delay: 0.5 });

    initialAnimations
      .to(".animate-refs", {
        y: 0,
        opacity: 1,
        duration: duration,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "transform",
      })
      .to(
        maskContainerRef.current,
        {
          y: 50,
          duration: duration * 0.7,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
      .to(mediaWCaptionRef.current, {
        opacity: 1,
      });

    return () => {
      initialAnimations.kill();
    };
  }, [isMobile, tabletView]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ST.Root
      scrub={true}
      start="top top"
      end="bottom bottom"
      callbacks={{
        refreshPriority: 1,

        onUpdate: () => {
          if (!isInitialized) {
            setIsInitialized(true);
          }
        },
      }}
    >
      <ST.Pin childHeight={"100vh"} pinSpacerHeight={"600vh"} top={0}>
        <section className={styles.hero} id="hero-section" ref={heroSectionRef}>
          <ST.Waypoint
            at={8}
            onCall={handleSplitText1Animation}
            onReverseCall={handleSplitText1Reverse}
          />

          <ST.Waypoint
            at={50}
            onCall={handleSplitText2Animation}
            onReverseCall={handleSplitText2Reverse}
          />

          <div className={styles.content}>
            <ST.Animation
              tween={{
                start: 26,
                end: 50,
                to: { y: "-90vh" },
              }}
            >
              <div
                className={`${styles.logoWrapper} animate-refs`}
                ref={(el) => (animateRefsRef.current[0] = el)}
              >
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
              <div
                className={`${styles.taglineWrapper} animate-refs`}
                ref={(el) => (animateRefsRef.current[1] = el)}
              >
                <Tagline />
              </div>
            </ST.Animation>

            <ST.Animation
              tween={{
                start: 26,
                end: 50,
                to: { y: "-100vh" },
              }}
            >
              <div className={`${styles.splitTextWrapper}`}>
                <SplitTextBg ref={splitTextAnimationRef} color="orange" inline>
                  <p>
                    Supporting healthy, resilient forests through a vibrant
                    forest-products economy including mass timber
                  </p>
                </SplitTextBg>
              </div>
            </ST.Animation>
          </div>

          <ST.Animation
            tween={[
              {
                start: 25,
                end: 75,
                to: {
                  y: 0,
                  clipPath: () => {
                    return isMobile || tabletView
                      ? "circle(190% at 50% 100%)"
                      : "circle(120% at 50% 100%)";
                  },
                },
              },
            ]}
          >
            <div
              className={`${styles.maskContainer} mask-container`}
              ref={maskContainerRef}
            >
              <div className={styles.mask}>
                <ST.Animation
                  tween={{
                    start: 25.5,
                    end: 50,
                    to: {
                      y: 0,
                      bottom: 0,
                      height: "100%",
                    },
                  }}
                >
                  <div className={styles.mediaWCaption} ref={mediaWCaptionRef}>
                    <MediaWCaption
                      url={heroImage}
                      priority={true}
                      caption={
                        "State Forest State Park, Colorado State Forest Service"
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
                    <p>Building better starts with suporting healthy forests</p>
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
                  <div
                    className={`${styles.eyeball1} ${styles.eyeball} will-change-opacity will-change-transform`}
                  >
                    <Eyeballs />
                  </div>
                  <div
                    className={`${styles.eyeball2} ${styles.eyeball} will-change-opacity will-change-transform`}
                  >
                    <Eyeballs />
                  </div>
                  <div
                    className={`${styles.eyeball3} ${styles.eyeball} will-change-opacity will-change-transform`}
                  >
                    <Eyeballs />
                  </div>
                  <div
                    className={`${styles.eyeball4} ${styles.eyeball}  will-change-opacity will-change-transform`}
                  >
                    <Eyeballs />
                  </div>
                  <div
                    className={`${styles.eyeball5} ${styles.eyeball}  will-change-opacity will-change-transform`}
                  >
                    <Eyeballs />
                  </div>
                </ST.Stagger>
              </div>
            </div>
          </ST.Animation>
          <ST.Animation
            tween={{
              start: 65,
              end: 80,
              to: { y: 0, opacity: 1, ease: "power2.inOut" },
            }}
          >
            <div className={styles.fireTrim} ref={fireTrimRef}>
              <MediaWCaption
                url={fireTrimGif}
                priority={false}
                caption={"cameron peak wildfire, USDA Forest Service  "}
              />
            </div>
          </ST.Animation>
        </section>
      </ST.Pin>
    </ST.Root>
  );
};

export default Hero;
