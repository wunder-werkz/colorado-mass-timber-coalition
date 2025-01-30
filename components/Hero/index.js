"use client";

import { useRef, useState } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import LogoLg from "@/components/SVG/LogoLg";
import Tagline from "@/components/SVG/Tagline";
import SplitTextBg from "@/components/SplitTextBg";
import styles from "./style.module.scss";
import { gsap } from "@/lib/gsapConfig";

const Hero = () => {
  const [showSplitText, setShowSplitText] = useState(false);
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const splitTextRef = useRef(null);
  const maskRef = useRef(null);
  const initialAnimationComplete = useRef(false);

  // ✅ Initial fade-in/move-up animation
  useIsomorphicLayoutEffect(() => {
    if (initialAnimationComplete.current) return;

    gsap.to([logoRef.current, taglineRef.current, maskRef.current], {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
      stagger: 0.2,
      overwrite: "auto",
      onComplete: () => {
        initialAnimationComplete.current = true;
      },
    });
  }, []);

  // ✅ Scroll animation (without resetting the initial animation)
  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const logo = logoRef.current;
    const tagline = taglineRef.current;
    const splitText = splitTextRef.current;
    const mask = maskRef.current;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
          scroller: "#smooth-wrapper",
          id: "heroScroll",
        },
      });

      scrollTl
        .to(tagline, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        })
        .add(() => setShowSplitText(true))
        .to(
          [logo, splitText],
          {
            y: "-150vh",
            duration: 2,
            stagger: 0.25,
            ease: "power2.out",
          },
          "start+=.5"
        )
        .to(
          mask,
          {
            clipPath: "circle(150% at 50% 100%)",
            ease: "power2.inOut",
            duration: 1,
          },
          "start+=.75"
        );
    });

    return () => ctx.revert();
  }, [showSplitText]);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.content}>
        <div ref={logoRef} className={styles.logoWrapper}>
          <LogoLg />
        </div>
        <div ref={taglineRef} className={styles.taglineWrapper}>
          <Tagline />
        </div>
        {showSplitText && (
          <div ref={splitTextRef} className={styles.splitTextWrapper}>
            <SplitTextBg
              key={showSplitText ? "visible" : "hidden"}
              color="orange"
              inline
            >
              a bunch of text a bunch of text a bunch of text a bunch of text a
              bunch of text a bunch of text
            </SplitTextBg>
          </div>
        )}
      </div>

      <div className={styles.maskContainer} ref={maskRef}>
        <div className={styles.mask}></div>
      </div>
    </section>
  );
};

export default Hero;
