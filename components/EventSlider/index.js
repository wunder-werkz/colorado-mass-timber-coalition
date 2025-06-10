"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsapConfig";
import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";
import Button from "@/components/Button";
import Arrow from "@/components/SVG/Arrow";
import SplitTextBg from "@/components/SplitTextBg";
import Event from "@/components/Event";

const EventSlider = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const slideRefs = useRef([]);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const splitTextAnimationRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const navDividerRef = useRef(null);

  // Memoized callbacks for animations
  const handleSplitTextStart = useCallback(() => {
    splitTextAnimationRef.current?.restart();
  }, []);

  const handleSplitTextReverse = useCallback(() => {
    splitTextAnimationRef.current?.reverse();
  }, []);

  const nextSlide = useCallback(() => {
    if (currentIndex < events.length - 3) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, events.length]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    const calculateSlideOffset = () => {
      if (slideRefs.current.length === 0) return 0;
      const slideElement = slideRefs.current[0];
      if (!slideElement) return 0;
      const slideWidth = slideElement.getBoundingClientRect().width;
      const computedStyle = getComputedStyle(document.documentElement);
      const gap = parseFloat(computedStyle.fontSize);
      return slideWidth + gap;
    };

    const slideOffset = calculateSlideOffset();

    gsap.to(slideRefs.current, {
      x: `${-currentIndex * slideOffset}px`,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [currentIndex]);

  return (
    <ST.Root start="top 80%" end="bottom bottom">
      <div className={styles.eventsHomeWrap} ref={containerRef}>
        <div className={styles.topWrap}>
          <div className={styles.eventsTitle}>
            <ST.Waypoint
              at={1}
              onCall={handleSplitTextStart}
              onReverseCall={handleSplitTextReverse}
            >
              <SplitTextBg ref={splitTextAnimationRef} color="orange">
                <h2 className={styles.eventsTitle}>Events</h2>
              </SplitTextBg>
            </ST.Waypoint>
          </div>

          <ST.Animation
            tween={{
              start: 5,
              end: 10,
              fromTo: [
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0 },
              ],
              ease: "power2.out",
            }}
          >
            <div ref={buttonRef}>
              <Button
                href="/events"
                variant="primary"
                color="orange"
                fill={true}
              >
                See All Events
              </Button>
            </div>
          </ST.Animation>
        </div>

        <div className={styles.sliderContainer}>
          <div className={styles.sliderWrapper} ref={sliderRef}>
            <ST.Animation
              tween={{
                start: 30,
                end: 60,
                fromTo: [
                  { opacity: 0, y: 100 },
                  { opacity: 1, y: 0 },
                ],
                ease: "power2.out",
              }}
            >
              <div className={styles.sliderTrack}>
                {events.map((event, index) => (
                  <Event
                    isSlider={true}
                    key={`event-${index}`}
                    event={event}
                    ref={(el) => (slideRefs.current[index] = el)}
                  />
                ))}
              </div>
            </ST.Animation>
          </div>
        </div>

        <div className={styles.navWrap}>
          <ST.Animation
            tween={{
              start: 80,
              end: 95,
              fromTo: [{ opacity: 0 }, { opacity: 1 }],
              stagger: 0.1,
              ease: "back.out(1.7)",
            }}
          >
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={styles.navButton}
              ref={prevButtonRef}
              aria-label="Previous"
            >
              <Arrow />
            </button>
          </ST.Animation>
          <ST.Animation
            tween={{
              start: 80,
              end: 95,
              fromTo: [
                { opacity: 0, scaleX: 0 },
                { opacity: 1, scaleX: 1 },
              ],
              ease: "power2.out",
            }}
          >
            <div className={styles.navDivider} ref={navDividerRef}></div>
          </ST.Animation>
          <ST.Animation
            tween={{
              start: 85,
              end: 95,
              fromTo: [{ opacity: 0 }, { opacity: 1 }],
              stagger: 0.1,
              ease: "back.out(1.7)",
            }}
          >
            <button
              onClick={nextSlide}
              disabled={currentIndex >= events.length - 3}
              className={styles.navButton}
              ref={nextButtonRef}
              aria-label="Next"
            >
              <Arrow />
            </button>
          </ST.Animation>
        </div>
      </div>
    </ST.Root>
  );
};

export default EventSlider;
