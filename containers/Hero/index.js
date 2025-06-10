"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import * as ST from "@bsmnt/scrollytelling";
import heroImage from "@/public/img/hero.jpg";
import fireTrimGif from "@/public/img/Fire_Trim.gif";

import Eyeballs from "@/components/Eyeballs";
import { MediaWCaption } from "@/components/MediaWCaption";
import SplitTextBg from "@/components/SplitTextBg";

import useWindowSize from "@/hooks/useWindowSize";
import { gsap } from "@/lib/gsapConfig";

import styles from "./style.module.scss";

const Hero = () => {
  const splitTextAnimationRef2 = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const maskContainerRef = useRef(null);
  const fireTrimRef = useRef(null);
  const heroSectionRef = useRef(null);
  const mediaWCaptionRef = useRef(null);
  const eyeballRefs = useRef();
  eyeballRefs.current = [];
  const { width, height } = useWindowSize();
  const isMobile = width < 768;
  const tabletView = height > width;

  // Memoized callbacks for animations to improve performance
  const handleSplitText2Animation = useCallback(() => {
    splitTextAnimationRef2.current?.restart();
  }, []);

  const addToRefs = (el) => {
    if (el && !eyeballRefs.current.includes(el)) {
      eyeballRefs.current.push(el)
    }
  }

  useEffect(() => {
    gsap.set(maskContainerRef.current, {
      y: 50,
      clipPath:
        isMobile || tabletView
          ? "circle(25% at 50% 60%)"
          : "circle(33vh at 50% 100%)",
      opacity: 1,
    });

    const initialAnimations = gsap.timeline({ delay: 0.5, onComplete: () => handleSplitText2Animation() });

    initialAnimations.to(mediaWCaptionRef.current, {
      opacity: 1,
    })
    .to(maskContainerRef.current,
      {
        y: 0,
        clipPath: 
          isMobile || tabletView 
            ? "circle(190% at 50% 100%)" 
            : "circle(120% at 50% 100%)",
        duration: 2,
      }
    ).to(eyeballRefs.current, {
      stagger: 0.2,
      opacity: 1, 
      y: 0
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
      <ST.Pin childHeight={"100vh"} pinSpacerHeight={"250vh"} top={0}>
        <section className={styles.hero} id="hero-section" ref={heroSectionRef}>
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
              <div
                ref={addToRefs}
                className={`${styles.eyeball1} ${styles.eyeball} will-change-opacity will-change-transform`}
                >
                <Eyeballs />
              </div>
              <div
                ref={addToRefs}
                className={`${styles.eyeball2} ${styles.eyeball} will-change-opacity will-change-transform`}
                >
                <Eyeballs />
              </div>
              <div
                ref={addToRefs}
                className={`${styles.eyeball3} ${styles.eyeball} will-change-opacity will-change-transform`}
              >
                <Eyeballs />
              </div>
              <div
                ref={addToRefs}
                className={`${styles.eyeball4} ${styles.eyeball}  will-change-opacity will-change-transform`}
              >
                <Eyeballs />
              </div>
              <div
                ref={addToRefs}
                className={`${styles.eyeball5} ${styles.eyeball}  will-change-opacity will-change-transform`}
              >
                <Eyeballs />
              </div>
            </div>
          </div>
          <ST.Animation
            tween={{
              start: 25,
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
