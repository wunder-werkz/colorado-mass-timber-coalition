"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsapConfig";
import styles from "./style.module.scss";
import Event from "@/components/Event";
import Button from "@/components/Button";

export default function EventsClient({ pastEvents, upcomingEvents }) {
  const [isShowingPastEvents, setIsShowingPastEvents] = useState(false);
  const containerRef = useRef(null);
  const eventsRef = useRef([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    const ctx = gsap.context(() => {
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
  }, []);

  return (
    <div className={styles.eventsPageWrap} ref={containerRef}>
      <div className={styles.topWrap}>
        <div className="events-title-container">
          <h1 className={styles.eventsTitle}>Events</h1>
        </div>

        <div className={styles.eventDesc}>
          <p>
          Join us at one of our upcoming events or browse through our past gatherings. From workshops to our community building 	&ldquo;Mass Timber Mixers&rdquo;, there&apos;s always something exciting happening
          </p>
          <div className={styles.key}>
            <div className={styles.circle}></div>
            <p> CMTC Sponsored or co-sponsored events </p>
          </div>
        </div>
      </div>
      <div className={styles.filterWrap}>
        <div className={styles.filterButtons}>
          <Button
            onClick={() => setIsShowingPastEvents(true)}
            variant="secondary"
            color="orange"
            fill={isShowingPastEvents}
          >
            Past <span className={styles.hideSm}>Events</span>
          </Button>
          <Button
            onClick={() => setIsShowingPastEvents(false)}
            variant="secondary"
            color="orange"
            fill={!isShowingPastEvents}
          >
            Future <span className={styles.hideSm}>Events</span>
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
