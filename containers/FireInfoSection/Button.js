"use client";

import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";
import { getSectionStartPosition } from "./utils";
import { useRef } from "react";

import useWindowSize from "@/hooks/useWindowSize";

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

  const { width } = useWindowSize();
  const hideText = width < 1080;

  return (
    <button
      className={styles.button}
      onClick={ST.useScrollToLabel(`tabPanel-${index}`)}
      ref={buttonRef}
    >
      <span>0{index + 1}</span>

      <ST.Waypoint
        at={getSectionStartPosition(index)}
        tween={{
          target: buttonRef.current,
          to: { background: "#ff752a" },
          duration: 0.3,
          ease: "power2.inOut",
        }}
      />

      <ST.Waypoint
        at={getSectionStartPosition(index + 1)}
        tween={{
          target: buttonRef.current,
          to: { background: "transparent" },
          duration: 0.3,
          ease: "power2.inOut",
        }}
      />

      {!hideText && (
        <>
          <ST.Waypoint
            at={getSectionStartPosition(index)}
            tween={{
              target: spanRef.current,
              to: { display: "inline", background: "transparent" },
              duration: 0.3,
              ease: "power2.inOut",
            }}
          />
          <ST.Waypoint
            at={getSectionStartPosition(index + 1)}
            tween={{
              target: spanRef.current,
              to: { display: "none", background: "transparent" },
              duration: 0.3,
              ease: "power2.inOut",
            }}
          />

          <span ref={spanRef} className={styles.buttonText}>
            : {buttonTexts[index]}
          </span>
        </>
      )}
    </button>
  );
}
