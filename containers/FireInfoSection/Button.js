import * as ST from "@bsmnt/scrollytelling";
import styles from "./style.module.scss";
import { mapToGlobalProgress } from "./utils";

const buttonTexts = [
  "The State Of Our Forests",
  "Up In Smoke",
  "Why This Is Happening?",
  "Why Does It Matter?",
  "What Can We Do?",
  "How Can We Do It?",
];

export default function Button({ index }) {
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
            start: mapToGlobalProgress(index, 0),
            end: mapToGlobalProgress(index, 5),
            to: {
              background: "#ff752a",
            },
          },
          {
            start: mapToGlobalProgress(index, 95),
            end: mapToGlobalProgress(index + 1, 0),
            to: { background: "transparent" },
          },
        ]}
      >
        <button className={styles.button} onClick={handleClick}>
          <span>0{index + 1}</span>
          <>
            <ST.Animation
              tween={[
                {
                  start: mapToGlobalProgress(index, 5),
                  end: mapToGlobalProgress(index + 1, 0),
                  to: {
                    display: "block",
                  },
                },
                {
                  start: mapToGlobalProgress(index, 95),
                  end: mapToGlobalProgress(index + 1, 0),
                  to: { display: "none" },
                },
              ]}
            >
              <span className={styles.buttonText}>: {buttonTexts[index]}</span>
            </ST.Animation>
          </>
        </button>
      </ST.Animation>
    </>
  );
}
