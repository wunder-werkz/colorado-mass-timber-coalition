"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsapConfig";
import styles from "./style.module.scss";
import SplitTextBg from "@/components/SplitTextBg";
import Event from "@/components/Event";
import Button from "@/components/Button";

export default function EventsClient({ pastEvents, upcomingEvents }) {
  const [isShowingPastEvents, setIsShowingPastEvents] = useState(false);
  const containerRef = useRef(null);
  const splitTextAnimationRef = useRef(null);
  const eventsRef = useRef([]);

  // Memoized callbacks for animations
  const handleSplitTextStart = useCallback(() => {
    splitTextAnimationRef.current?.restart();
  }, []);

  const handleSplitTextReverse = useCallback(() => {
    splitTextAnimationRef.current?.reverse();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          onEnter: handleSplitTextStart,
          onLeaveBack: handleSplitTextReverse,
        },
      });

      gsap.from(eventsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 100,
        duration: 0.2,
        stagger: {
          each: 0.2,
          ease: "power2.out",
        },
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, [handleSplitTextStart, handleSplitTextReverse]);

  return (
    <div className={styles.eventsPageWrap} ref={containerRef}>
      <div className={styles.topWrap}>
        <div className="events-title-container">
          <SplitTextBg ref={splitTextAnimationRef} color="orange">
            <h1 className={styles.eventsTitle}>Events</h1>
          </SplitTextBg>
        </div>
        <p className={styles.eventDesc}>
          Join us at one of our upcoming events or browse through our past
          gatherings. From workshops to community meetups, there&apos;s always
          something exciting happening.
        </p>
      </div>
      <div className={styles.filterWrap}>
        <div className={styles.filterButtons}>
          <Button
            onClick={() => setIsShowingPastEvents(false)}
            variant="secondary"
            color="orange"
            fill={!isShowingPastEvents}
          >
            Future Events
          </Button>
          <Button
            onClick={() => setIsShowingPastEvents(true)}
            variant="secondary"
            color="orange"
            fill={isShowingPastEvents}
          >
            Past Events
          </Button>
        </div>
      </div>
      <div className={styles.eventsGrid}>
        {(isShowingPastEvents ? pastEvents : upcomingEvents).map(
          (event, index) => (
            <Event
              key={event._id}
              event={event}
              ref={(el) => (eventsRef.current[index] = el)}
              secondary={true}
              isPastEvent={isShowingPastEvents}
            />
          )
        )}
      </div>
    </div>
  );
}
