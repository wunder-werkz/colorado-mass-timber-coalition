"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsapConfig";
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
    gsap.to(slideRefs.current, {
      x: `${-currentIndex * 100}%`,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [currentIndex]);

  useEffect(() => {
    gsap.set([prevButtonRef.current, nextButtonRef.current], {
      opacity: 0,
    });
    gsap.set(navDividerRef.current, {
      scaleX: 0,
      opacity: 0,
    });

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          onEnter: handleSplitTextStart,
          onLeaveBack: handleSplitTextReverse,
        },
      });

      gsap.from(buttonRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.35,
        delay: 0.7,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom bottom",
          toggleActions: "play reverse play reverse",
          scrub: true,
        },
      });

      tl.from(slideRefs.current, {
        opacity: 0,
        y: 100,
        duration: 0.4,
        stagger: {
          each: 0.2,
          ease: "power2.out",
        },
        delay: 0.3,
      });

      tl.to(navDividerRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      tl.to([prevButtonRef.current, nextButtonRef.current], {
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        stagger: 0.1,
      });
    });

    return () => ctx.revert();
  }, [handleSplitTextStart, handleSplitTextReverse]);

  return (
    <div className={styles.eventsHomeWrap} ref={containerRef}>
      <div className={styles.topWrap}>
        <div className="events-title-container">
          <SplitTextBg ref={splitTextAnimationRef} color="orange">
            <h2 className={styles.eventsTitle}>Events</h2>
          </SplitTextBg>
        </div>
        <div ref={buttonRef}>
          <Button href="/events" variant="primary" color="orange" fill={true}>
            View All Events
          </Button>
        </div>
      </div>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderWrapper} ref={sliderRef}>
          <div className={styles.sliderTrack}>
            {events.map((event, index) => (
              <Event
                key={`event-${index}`}
                event={event}
                ref={(el) => (slideRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.navWrap}>
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={styles.navButton}
          ref={prevButtonRef}
        >
          <Arrow />
        </button>
        <div className={styles.navDivider} ref={navDividerRef}></div>
        <button
          onClick={nextSlide}
          disabled={currentIndex >= events.length - 3}
          className={styles.navButton}
          ref={nextButtonRef}
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
};

export default EventSlider;
