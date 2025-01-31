"use client";

import { useRef, useState } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import LogoLg from "@/components/SVG/LogoLg";
import Tagline from "@/components/SVG/Tagline";
import SplitTextBg from "@/components/SplitTextBg";
import styles from "./style.module.scss";
import { gsap } from "@/lib/gsapConfig";

const Hero = () => {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const splitTextRef = useRef(null);
  const maskRef = useRef(null);
  const initialAnimationComplete = useRef(false);

  const [showSplitText, setShowSplitText] = useState(false);

  // ✅ Initial animation (runs once)
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

  // ✅ Scroll-triggered animation
  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 1,
        scroller: "#smooth-wrapper",
        id: "heroScroll",
        toggleActions: "play none none reverse",
      },
    });

    scrollTl
      .to(taglineRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto",
      })
      .call(
        () => {
          setShowSplitText(true);
        },
        null,
        "-=0.5"
      )
      .to(
        logoRef.current,
        {
          y: "-150vh",
          duration: 2,
          ease: "power2.out",
          overwrite: "auto",
        },
        "-=1"
      )
      .to(
        maskRef.current,
        {
          clipPath: "circle(150% at 50% 100%)",
          ease: "power2.inOut",
          duration: 1.5,
        },
        "-=1"
      );

    return () => scrollTl.scrollTrigger?.kill();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.content}>
        <div ref={logoRef} className={styles.logoWrapper}>
          <LogoLg />
        </div>
        {/* ✅ Conditionally render SplitTextBg instead of just hiding it */}
        {showSplitText ? (
          <div ref={splitTextRef} className={styles.splitTextWrapper}>
            <SplitTextBg color="orange" inline>
              a bunch of text a bunch of text a bunch of text a bunch of text a
              bunch of text a bunch of text
            </SplitTextBg>
          </div>
        ) : (
          <div ref={taglineRef} className={styles.taglineWrapper}>
            <Tagline />
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
