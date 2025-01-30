"use client";

import { useRef } from "react";
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

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const logo = logoRef.current;
    const tagline = taglineRef.current;
    const splitText = splitTextRef.current;
    const mask = maskRef.current;

    const initialTl = gsap.timeline();

    initialTl.to([logo, tagline, mask], {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
      stagger: 0.2,
      toggleActions: "play reverse play reverse",
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 1,
        scroller: "#smooth-wrapper",
      },
    });

    scrollTl.to(mask, {
      clipPath: "circle(150% at 50% 100%)",
      ease: "power2.inOut",
    });

    return () => {
      scrollTl.kill();
      initialTl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.content}>
        <div ref={logoRef} className={styles.logoWrapper}>
          <LogoLg />
        </div>
        <div ref={taglineRef} className={styles.taglineWrapper}>
          <Tagline />
        </div>
        <div ref={splitTextRef} className={styles.splitTextWrapper}>
          <SplitTextBg color="orange" inline>
            a bunch of text a bunch of texta bunch of text a bunch of text a
            bunch of text a bunch of text
          </SplitTextBg>
        </div>
      </div>

      <div className={styles.maskContainer} ref={maskRef}>
        <div className={styles.mask}></div>
      </div>
    </section>
  );
};

export default Hero;
