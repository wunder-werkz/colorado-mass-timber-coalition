"use client";

import { useRef, forwardRef, useImperativeHandle, useEffect } from "react";

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

    useEffect(() => {
      const ctx = gsap.context(() => {
        const padding = "1px 25px";
        textRef.current.style.padding = padding;

        // Store splitText reference for cleanup
        let splitTextInstance = null;

        // Function to handle text splitting and animation setup
        const setupSplitText = () => {
          // Clean up previous split if it exists
          if (splitTextInstance) {
            splitTextInstance.revert();

            // Clear existing refs
            backgroundsRef.current = [];
            linesRef.current = [];
          }

          const sups = textRef.current.getElementsByTagName("sup");

          if (sups.length) {
            Array.from(sups).forEach((sup) => {
              sup.className = styles.citation;
              sup.addEventListener("click", (e) => {
                e.preventDefault();
                openModal();
              });
            });
          }

          splitTextInstance = new SplitText(textRef.current.children[0], {
            types: "lines",
            linesClass: styles.line,
            reduceWhiteSpace: true,
          });

          textRef.current.style.padding = "0";

          splitTextInstance.lines.forEach((line, i) => {
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

          // Setup animation timeline
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

          // Apply play state based on isPlaying prop
          if (isPlaying) {
            animationTl.current.play();
          } else {
            animationTl.current.pause();
          }
        };

        // Initial setup
        setupSplitText();

        // Add resize handler with debounce
        const debounce = (func, wait) => {
          let timeout;
          return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
          };
        };

        const handleResize = debounce(setupSplitText, 300);
        window.addEventListener("resize", handleResize);

        return () => {
          // const sups = textRef.current.getElementsByTagName("sup");

          // if (sups.length) {
          //   Array.from(sups).forEach((sup) => {
          //     sup.removeEventListener("click", openModal);
          //   });
          // }

          if (splitTextInstance) {
            splitTextInstance.revert();
          }

          window.removeEventListener("resize", handleResize);
        };
      }, textRef);

      return () => ctx.revert();
    }, [inline, isPlaying, openModal]);

    useEffect(() => {
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
