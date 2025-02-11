import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";
import { mapToGlobalProgress } from "./utils";
import { useRef } from "react";
export default function Button({ index }) {
  const buttonRef = useRef(null);
  const scrollTo = ST.useScrollToLabel();

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
            start: mapToGlobalProgress(index, 0),
            end: mapToGlobalProgress(index, 15),
            to: {
              background: "#ff752a",
            },
          },
          {
            start: mapToGlobalProgress(index, 95),
            end: mapToGlobalProgress(index, 100),
            to: { background: "transparent" },
          },
        ]}
      >
        <button className={styles.button} onClick={handleClick}>
          <>
            <ST.Animation
              tween={[
                {
                  start: mapToGlobalProgress(index, 0),
                  end: mapToGlobalProgress(index, 15),
                  to: {
                    display: "none",
                  },
                },
                {
                  start: mapToGlobalProgress(index, 95),
                  end: mapToGlobalProgress(index, 100),
                  to: { display: "block" },
                },
              ]}
            >
              <span>0{index + 1}</span>
            </ST.Animation>
          </>
          <>
            <ST.Animation
              tween={[
                {
                  start: mapToGlobalProgress(index, 15),
                  end: mapToGlobalProgress(index, 20),
                  to: {
                    display: "block",
                  },
                },
                {
                  start: mapToGlobalProgress(index, 85),
                  end: mapToGlobalProgress(index, 95),
                  to: { display: "none" },
                },
              ]}
            >
              <span className={styles.buttonText}>longer name</span>
            </ST.Animation>
          </>
        </button>
      </ST.Animation>
    </>
  );
}
