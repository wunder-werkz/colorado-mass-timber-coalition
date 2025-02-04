import styles from "./style.module.scss";
import Button from "@/components/Button";

import { forwardRef } from "react";

const Event = forwardRef(({ event, secondary }, ref) => {
  const renderDate = () => {
    if (!event.endDate) {
      return new Date(event.startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
    if (event.startDate && event.endDate) {
      const startDate = new Date(event.startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const endDate = new Date(event.endDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return `${startDate} - ${endDate}`;
    }

    return "";
  };

  const selfHosted = event?.selfHosted;

  return (
    <div
      className={`${styles.eventWrap} ${secondary ? styles.secondary : ""}`}
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
        <Button
          href={`${event.link}`}
          variant="primary"
          color={selfHosted ? "orange" : "forest"}
          fill={false}
        >
          See More
        </Button>
      </div>
    </div>
  );
});

Event.displayName = "Event";

export default Event;
