"use client";
import { useEffect, useRef, useState } from "react";
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

  const nextSlide = () => {
    if (currentIndex < events.length - 3) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    gsap.to(slideRefs.current, {
      x: `${-currentIndex * (100 + 4)}%`,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [currentIndex]);

  return (
    <div className={styles.eventsHomeWrap}>
      <div className={styles.topWrap}>
        <SplitTextBg isPlaying={true} color="orange">
          <h2 className={styles.eventsTitle}>Events</h2>
        </SplitTextBg>
        <Button href="/events" variant="primary" color="orange" fill={true}>
          View All Events
        </Button>
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
        >
          <Arrow />
        </button>
        <div className={styles.navDivider}></div>
        <button
          onClick={nextSlide}
          disabled={currentIndex >= events.length - 3}
          className={styles.navButton}
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
};

export default EventSlider;
