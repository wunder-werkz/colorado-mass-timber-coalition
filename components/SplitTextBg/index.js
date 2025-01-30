"use client";

import { useRef } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

import { gsap, SplitText } from "@/lib/gsapConfig";

import styles from "./style.module.scss";

export default function SplitTextBg({ children, color, inline = false }) {
  const textRef = useRef(null);
  const backgroundsRef = useRef([]);
  const linesRef = useRef([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const padding = "0.5em 1em";
      textRef.current.style.padding = padding;

      const splitText = new SplitText(textRef.current, {
        types: "lines",
        linesClass: styles.line,
      });

      textRef.current.style.padding = "0";

      splitText.lines.forEach((line, i) => {
        const wrapper = document.createElement("div");
        wrapper.className = `${styles.lineWrapper} ${inline ? styles.inline : ""}`;
        const background = document.createElement("div");
        background.className = styles.lineBackground;

        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
        wrapper.insertBefore(background, line);

        backgroundsRef.current[i] = background;
        linesRef.current[i] = line;

        gsap.set(background, { scaleY: 0 });
        gsap.set(line, { yPercent: 100, opacity: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      });

      tl.addLabel("start")
        .to(
          backgroundsRef.current,
          {
            scaleY: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power4.inOut",
          },
          "start"
        )
        .to(
          linesRef.current,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "expo.out",
          },
          "start+=0.5"
        );

      return () => {
        splitText.revert();
      };
    }, textRef);

    return () => ctx.revert();
  }, [inline]);

  return (
    <div className={styles.container}>
      <div ref={textRef} className={`${styles.text} ${styles[color]}`}>
        {children}
      </div>
    </div>
  );
}
