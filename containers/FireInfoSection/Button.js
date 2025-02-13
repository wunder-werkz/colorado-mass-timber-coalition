import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";
import { mapToGlobalProgress } from "./utils";
import { useRef } from "react";

const buttonTexts = [
  "The State Of Our Forests",
  "Up In Smoke",
  "Why This Is Happening?",
  "Why Does It Matter?",
  "What Can We Do?",
  "How Can We Do It?",
];

export default function Button({ index }) {
  const buttonRef = useRef(null);
  const spanRef = useRef(null);

  const { scrollTo } = ST.useScrollToLabel();

  const handleClick = () => {
    scrollTo(`tab-section-${index}`, {
      behavior: "smooth",
      offset: 0,
    });
  };

  return (
    <>
      <ST.Waypoint
        at={mapToGlobalProgress(index, 0)}
        tween={{
          target: buttonRef.current,
          to: {
            background: "#ff752a",
          },
        }}
      />
      <ST.Waypoint
        at={mapToGlobalProgress(index, 0)}
        tween={{
          target: spanRef.current,
          to: {
            display: "block",
          },
        }}
      />

      <ST.Waypoint
        at={mapToGlobalProgress(index, 100)}
        tween={{
          target: buttonRef.current,
          to: {
            background: "transparent",
          },
        }}
      />
      <ST.Waypoint
        at={mapToGlobalProgress(index, 100)}
        tween={{
          target: spanRef.current,
          to: {
            display: "none",
          },
        }}
      />
      <button className={styles.button} onClick={handleClick} ref={buttonRef}>
        <span>0{index + 1}</span>

        <span className={styles.buttonText} ref={spanRef}>
          : {buttonTexts[index]}
        </span>
      </button>
    </>
  );
}
