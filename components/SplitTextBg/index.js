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
import useWindowSize from "@/hooks/useWindowSize";

// Mobile breakpoint
const MOBILE_BREAKPOINT = 900;

const SplitTextBg = forwardRef(
  ({ children, color, stumpy, body, inline = false, isPlaying = false }, ref) => {
    const containerRef = useRef(null);
    const backgroundsRef = useRef([]);
    const textRef = useRef(null);
    const splitTextInstanceRef = useRef(null);
    const animationTl = useRef(null);
    const linesRef = useRef([]);
    const { openModal } = useModal();
    const { width } = useWindowSize();
    const isMobile = width < MOBILE_BREAKPOINT;

    useImperativeHandle(ref, () => ({
      play: () => animationTl.current?.play(),
      pause: () => animationTl.current?.pause(),
      restart: () => animationTl.current?.restart(),
      reverse: () => animationTl.current?.reverse(),
    }));

    useEffect(() => {
      if (!textRef.current) return;

      if (animationTl.current) {
        animationTl.current.kill();
      }

      const ctx = gsap.context(() => {
        const textElem = textRef.current;

        if (isMobile) {
          if (textElem.children[0]) {
            textElem.children[0].style.paddingRight = "0px";
            textElem.children[0].style.paddingLeft = "0px";
          }

          if (splitTextInstanceRef.current) {
            splitTextInstanceRef.current.revert();
            backgroundsRef.current = [];
            linesRef.current = [];
          }
          if (inline) {
            const firstElem = textElem.children[0];
            const span = document.createElement("span");
            span.innerHTML = firstElem.innerHTML;

            firstElem.innerHTML = "";
            firstElem.appendChild(span);
          }

          gsap.set(textElem, { autoAlpha: 0, y: 20 });
          animationTl.current = gsap.timeline({ paused: true });
          animationTl.current.to(
            textElem,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            0
          );
        } else {
          if (splitTextInstanceRef.current) {
            splitTextInstanceRef.current.revert();
            backgroundsRef.current = [];
            linesRef.current = [];
          }
          const textWidth = 25;
          if (textElem) {
            textElem.style.paddingRight = `${textWidth}px`;
            textElem.style.paddingLeft = `${textWidth}px`;
          }

          splitTextInstanceRef.current = new SplitText(textElem.children[0], {
            types: "lines",
            linesClass: styles.line,
            reduceWhiteSpace: false,
            lineThreshold: 0.5,
            onComplete: () => {
              if (textElem) {
                textElem.style.paddingRight = "0px";
                textElem.style.paddingLeft = "0px";
              }
            },
          });

          if (textElem) {
            textElem.style.paddingRight = "0px";
            textElem.style.paddingLeft = "0px";
          }

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
        }
        if (isPlaying) {
          animationTl.current.play();
        } else {
          animationTl.current.pause();
        }
      });

      return () => ctx.revert();
    }, [inline, isPlaying, isMobile, color, width]);

    useEffect(() => {
      if (animationTl.current) {
        if (isPlaying) {
          animationTl.current.play();
        } else {
          animationTl.current.reverse();
        }
      }
    }, [isPlaying]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (!containerRef.current) {
          console.log("Container ref not available yet");
          return;
        }

        const sups = containerRef.current.querySelectorAll("sup");

        if (sups.length) {
          const handleSupClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal();
          };

          Array.from(sups).forEach((sup) => {
            sup.className = styles.citation;
            sup.style.cursor = "pointer";

            sup.removeEventListener("click", handleSupClick);
            sup.addEventListener("click", handleSupClick);
          });
        }
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    }, [openModal, containerRef]);

    return (
      <div className={styles.container} ref={containerRef}>
        <div
          ref={textRef}
          className={`${styles.text} ${stumpy && styles.stumpy} ${body && styles.body} ${styles[color]} ${inline ? "" : styles.block}`}
        >
          {children}
        </div>
      </div>
    );
  }
);

SplitTextBg.displayName = "SplitTextBg";
export default SplitTextBg;
