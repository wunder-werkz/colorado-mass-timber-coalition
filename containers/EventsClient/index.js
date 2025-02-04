"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsapConfig";
import styles from "./style.module.scss";
import SplitTextBg from "@/components/SplitTextBg";
import Event from "@/components/Event";

export default function EventsClient({ events, general }) {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const containerRef = useRef(null);
  const splitTextAnimationRef = useRef(null);
  const eventsRef = useRef([]);

  const showFutureEvents = () => {
    const future = events.filter(
      (event) => new Date(event.startDate) >= new Date()
    );
    setFilteredEvents(future);
  };

  const showPastEvents = () => {
    const past = events.filter(
      (event) => new Date(event.startDate) < new Date()
    );
    setFilteredEvents(past);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          onEnter: () => splitTextAnimationRef.current?.restart(),
          onLeaveBack: () => splitTextAnimationRef.current?.reverse(),
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
  }, [filteredEvents]);

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
          gatherings. From workshops to community meetups, there's always
          something exciting happening.
        </p>
        <div className={styles.filterButtons}>
          <button onClick={showFutureEvents}>Upcoming Events</button>
          <button onClick={showPastEvents}>Past Events</button>
        </div>
      </div>
      <div className={styles.eventsGrid}>
        {filteredEvents.map((event, index) => (
          <Event
            key={event._id}
            event={event}
            ref={(el) => (eventsRef.current[index] = el)}
            secondary={true}
          />
        ))}
      </div>
    </div>
  );
}
