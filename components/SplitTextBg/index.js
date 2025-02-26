"use client";

import {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { gsap, SplitText } from "@/lib/gsapConfig";
import styles from "./style.module.scss";
import { useModal } from "@/context/ModalContext";

// Debounce utility
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const SplitTextBg = forwardRef(
  ({ children, color, inline = false, isPlaying = false }, ref) => {
    const textRef = useRef(null);
    const backgroundsRef = useRef([]);
    const linesRef = useRef([]);
    const animationTl = useRef(null);
    const splitTextInstanceRef = useRef(null);
    const { openModal } = useModal();

    const lastWidthRef = useRef(0);

    useImperativeHandle(ref, () => ({
      play: () => animationTl.current?.play(),
      pause: () => animationTl.current?.pause(),
      restart: () => animationTl.current?.restart(),
      reverse: () => animationTl.current?.reverse(),
    }));

    // Define setupSplitText function outside useEffect to allow reuse
    const setupSplitText = useCallback(() => {
      if (!textRef.current) return;

      const padding = "1px 25px";
      textRef.current.style.padding = padding;

      // Clean up previous split if it exists
      if (splitTextInstanceRef.current) {
        splitTextInstanceRef.current.revert();

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

      splitTextInstanceRef.current = new SplitText(
        textRef.current.children[0],
        {
          types: "lines",
          linesClass: styles.line,
          reduceWhiteSpace: true,
        }
      );

      textRef.current.style.padding = "0";

      splitTextInstanceRef.current.lines.forEach((line, i) => {
        const wrapper = document.createElement("div");
        wrapper.className = `${styles.lineWrapper} ${inline ? styles.inline : ""}`;
        wrapper.style.willChange = "transform";

        const background = document.createElement("div");
        background.className = styles.lineBackground;
        background.style.willChange = "transform";

        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
        wrapper.insertBefore(background, line);

        backgroundsRef.current[i] = background;
        linesRef.current[i] = line;

        gsap.set(background, { scaleY: 0 });
        gsap.set(line, { yPercent: 100 });
      });

      // Setup animation timeline
      animationTl.current = gsap.timeline({
        paused: true,
        onComplete: () => {
          backgroundsRef.current.forEach((bg) => {
            if (bg) bg.style.willChange = "auto";
          });

          linesRef.current.forEach((line) => {
            if (line && line.parentNode)
              line.parentNode.style.willChange = "auto";
          });
        },
      });

      animationTl.current
        .addLabel("start")
        .to(
          backgroundsRef.current,
          {
            scaleY: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.inOut",
          },
          "start"
        )
        .to(
          linesRef.current,
          {
            yPercent: 0,
            duration: 0.2,
            stagger: 0.05,
            ease: "power2.out",
          },
          "start+=0.25"
        );

      // Apply play state based on isPlaying prop
      if (isPlaying) {
        animationTl.current.play();
      } else {
        animationTl.current.pause();
      }
    }, [inline, isPlaying, openModal]);

    // Create memoized handlers
    const debouncedResizeHandler = useMemo(
      () =>
        debounce(() => {
          if (!textRef.current) return;

          // Only do a full recalculation on significant size changes
          if (window.innerWidth !== lastWidthRef.current) {
            setupSplitText();
            lastWidthRef.current = window.innerWidth;
          }
        }, 300),
      [setupSplitText]
    );

    useEffect(() => {
      const ctx = gsap.context(() => {
        lastWidthRef.current = window.innerWidth;
        setupSplitText();
        window.addEventListener("resize", debouncedResizeHandler);

        return () => {
          if (splitTextInstanceRef.current) {
            splitTextInstanceRef.current.revert();
          }
          window.removeEventListener("resize", debouncedResizeHandler);
        };
      }, textRef);

      return () => ctx.revert();
    }, [inline, debouncedResizeHandler, setupSplitText]);

    useEffect(() => {
      if (isPlaying) {
        // Reset will-change for animation
        backgroundsRef.current.forEach((bg) => {
          if (bg) bg.style.willChange = "transform";
        });

        linesRef.current.forEach((line) => {
          if (line && line.parentNode)
            line.parentNode.style.willChange = "transform";
        });

        animationTl.current?.play();
      } else {
        animationTl.current?.pause();
      }
    }, [isPlaying]);

    // Clean up effect for event listeners on citations
    useEffect(() => {
      const text = textRef.current;
      return () => {
        if (text) {
          const sups = text.getElementsByTagName("sup");
          if (sups.length) {
            Array.from(sups).forEach((sup) => {
              sup.removeEventListener("click", openModal);
            });
          }
        }
      };
    }, [openModal]);

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
