import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";
import { mapToTransitionProgress, mapToGlobalProgress } from "./utils";
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
      <ST.Animation
        tween={[
          {
            start: mapToTransitionProgress(index, 0),
            end: mapToTransitionProgress(index, 100),
            fromTo: [
              {
                background: "transparent",
              },
              {
                background: "#ff752a",
              },
            ],
            ease: "power2.inOut",
          },
          {
            start: mapToTransitionProgress(index + 1, 0),
            end: mapToTransitionProgress(index + 1, 100),
            to: {
              background: "transparent",
            },
            ease: "power2.inOut",
          },
        ]}
      >
        <button className={styles.button} onClick={handleClick} ref={buttonRef}>
          <span>0{index + 1}</span>

          <ST.Animation
            tween={[
              {
                start: mapToTransitionProgress(index, 0),
                end: mapToTransitionProgress(index, 50),
                fromTo: [
                  { opacity: 0, x: -10, display: "none" },
                  { opacity: 1, x: 0, display: "block" },
                ],
                ease: "power2.inOut",
              },
              {
                start: mapToTransitionProgress(index + 1, 0),
                end: mapToTransitionProgress(index + 1, 50),
                to: { opacity: 0, x: -10, display: "none" },
                ease: "power2.inOut",
              },
            ]}
          >
            <span className={styles.buttonText} ref={spanRef}>
              : {buttonTexts[index]}
            </span>
          </ST.Animation>
        </button>
      </ST.Animation>
    </>
  );
}
