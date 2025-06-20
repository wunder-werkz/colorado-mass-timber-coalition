"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import * as ST from "@bsmnt/scrollytelling";
import heroImage from "@/public/img/hero.jpg";
import fireTrimGif from "@/public/img/Fire_Trim.gif";

import Eyeballs from "@/components/Eyeballs";
import { MediaWCaption } from "@/components/MediaWCaption";
import SplitTextBg from "@/components/SplitTextBg";
import Button from "@/components/Button";
import useWindowSize from "@/hooks/useWindowSize";
import { gsap } from "@/lib/gsapConfig";

import styles from "./style.module.scss";

const Hero = () => {
  const splitTextAnimationRef2 = useRef(null);
  const scrollingRef = useRef(null);
  const buttonsRef = useRef(null);
  const arrowRef = useRef(null); 
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
    scrollingRef.current?.restart();
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
    }).to(buttonsRef.current, {
      opacity: 1
    }).to(arrowRef.current, {
      opacity: 1
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
        <ST.Animation
            tween={{
              start: 25,
              end: 80,
              to: { opacity: 0, ease: "power2.inOut" },
            }}
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
              <div className={styles.buttonsContainer} ref={buttonsRef}>
                <Button
                  href={"#forests"}
                  variant="secondary"
                  color="white"
                  fill={true}
                >
                  See Forests
                </Button>
                <Button
                  href={"#timber"}
                  variant="secondary"
                  color="white"
                  fill={true}
                >
                  See Mass Timber
                </Button>
              </div>
              <div className={styles.scrollingText}>
              <SplitTextBg ref={scrollingRef} color="orange" body={true}>
                <h3>
                    Keep scrolling to read our full story. 
                </h3>
              </SplitTextBg>
              <div className={styles.arrowWrap} ref={arrowRef}>
                <svg viewBox="0 0 16 81">
                  <path d="M8.7071 80.7071C8.31658 81.0976 7.68341 81.0976 7.29289 80.7071L0.928929 74.3431C0.538405 73.9526 0.538405 73.3195 0.928929 72.9289C1.31945 72.5384 1.95262 72.5384 2.34314 72.9289L8 78.5858L13.6569 72.9289C14.0474 72.5384 14.6805 72.5384 15.0711 72.9289C15.4616 73.3195 15.4616 73.9526 15.0711 74.3431L8.7071 80.7071ZM8 0L9 8.48637e-08L9 80L8 80L7 80L7 -8.48634e-08L8 0Z" fill="#FF752A"/>
                  </svg>
                </div>
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
          </ST.Animation>
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
