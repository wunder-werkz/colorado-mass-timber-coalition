"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, SplitText } from "@/lib/gsapConfig";
import styles from "./style.module.scss";
import { useModal } from "@/context/ModalContext";

const SplitTextBg = forwardRef(
  ({ children, color, inline = false, isPlaying = false }, ref) => {
    const textRef = useRef(null);
    const backgroundsRef = useRef([]);
    const linesRef = useRef([]);
    const animationTl = useRef(null);
    const { openModal } = useModal();

    useImperativeHandle(ref, () => ({
      play: () => animationTl.current?.play(),
      pause: () => animationTl.current?.pause(),
      restart: () => animationTl.current?.restart(),
      reverse: () => animationTl.current?.reverse(),
    }));

    useIsomorphicLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const padding = "0.5em 1em";
        textRef.current.style.padding = padding;

        const sups = textRef.current.getElementsByTagName("sup");
        Array.from(sups).forEach((sup) => {
          sup.className = styles.citation;
          sup.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
          });
        });

        const splitText = new SplitText(textRef.current.children[0], {
          types: "lines",
          linesClass: styles.line,
          reduceWhiteSpace: false,
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

        animationTl.current = gsap.timeline({ paused: true });

        animationTl.current
          .addLabel("start")
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
          // Clean up event listeners
          Array.from(sups).forEach((sup) => {
            sup.removeEventListener("click", openModal);
          });
          splitText.revert();
        };
      }, textRef);

      return () => ctx.revert();
    }, [inline]);

    useIsomorphicLayoutEffect(() => {
      if (isPlaying) {
        animationTl.current?.play();
      } else {
        animationTl.current?.pause();
      }
    }, [isPlaying]);

    return (
      <div className={styles.container}>
        <div ref={textRef} className={`${styles.text} ${styles[color]}`}>
          {children}
        </div>
      </div>
    );
  }
);

SplitTextBg.displayName = "SplitTextBg";
export default SplitTextBg;
