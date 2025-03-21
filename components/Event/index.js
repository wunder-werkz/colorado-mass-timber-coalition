import styles from "./style.module.scss";
import Button from "@/components/Button";

import { forwardRef } from "react";

const Event = forwardRef(({ isSlider, event, secondary, isPastEvent = false }, ref) => {
  const renderDate = () => {
    const dateOptions = {
      timeZone: 'UTC', month: "short", day: "numeric",  ...(isPastEvent && { year: "numeric" })
    };

    if (!event.endDate) {
      return new Date(event.startDate).toLocaleDateString('en-US', {dateOptions});
    }

    if (event.startDate && event.endDate) {
      const startDate = new Date(event.startDate).toLocaleDateString('en-US', dateOptions);
      const endDate = new Date(event.endDate).toLocaleDateString(
        "en-US",
        dateOptions
      );
      return `${startDate} - ${endDate}`;
    }

    return "";
  };

  const selfHosted = event?.selfHosted;

  return (
    <div
      className={`${styles.eventWrap} ${secondary ? styles.secondary : ""}${isSlider && styles.slider}`}
      ref={ref}
    >
      <div
        className={`${styles.eventDate} ${selfHosted ? styles.selfHosted : ""}`}
      >
        {renderDate()}
      </div>
      <div
        className={`${styles.eventInfo} ${selfHosted ? styles.selfHosted : ""}`}
      >
        <div className={styles.eventInfoInner}>
          <h3>{event.name}</h3>
          <p>{event.location}</p>
        </div>
        {event.link && (
          <Button
            href={`${event.link}`}
            variant="primary"
            color={selfHosted ? "forest" : "orange"}
            fill={false}
          >
            See More
          </Button>
        )}
      </div>
    </div>
  );
});

Event.displayName = "Event";

export default Event;
