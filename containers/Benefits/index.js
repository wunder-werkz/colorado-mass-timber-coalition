"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import styles from "./style.module.scss";

import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";
import Stumpy from "@/components/Stumpy";

export default function Benefits() {
  const containerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const contentRefs = useRef([]);
  const splitTextRefs = useRef([]);
  const stumpyRefs = useRef([]);
  const stumpyTextRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each section when it comes into view
      contentRefs.current.forEach((content, index) => {
        const { textRef, imageRef } = content;

        // Different parallax speeds based on index
        const parallaxDistance = index % 2 === 0 ? 100 : -100;
        const parallaxSpeed = 0.5 + index * 0.1;

        // Parallax for images with different speeds
        gsap.to(imageRef, {
          scrollTrigger: {
            trigger: textRef,
            start: "top bottom",
            end: "bottom top",
            scrub: parallaxSpeed,
          },
          y: parallaxDistance,
          ease: "none",
        });

        // Text animation trigger
        ScrollTrigger.create({
          trigger: textRef,
          start: "top 80%",
          onEnter: () => splitTextRefs.current[index]?.restart(),
          onLeaveBack: () => splitTextRefs.current[index]?.reverse(),
        });
      });

      // Stumpy animations - now using stumpyRefs directly
      stumpyRefs.current.forEach((stumpyRef, index) => {
        if (!stumpyRef) return;

        // Set initial states
        gsap.set(stumpyRef, {
          scale: 0.8,
          opacity: 0,
        });

        ScrollTrigger.create({
          trigger: stumpyRef,
          start: "top 80%",
          onEnter: () => {
            // Animate stumpy
            gsap.to(stumpyRef, {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            });

            // Animate text
            const stumpyTextRef = stumpyTextRefs.current[index];
            if (stumpyTextRef) {
              stumpyTextRef.restart();
            }
          },
          onLeaveBack: () => {
            const stumpyTextRef = stumpyTextRefs.current[index];
            if (stumpyTextRef) {
              stumpyTextRef.reverse();
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Eyebrow animation
    gsap.from(eyebrowRef.current.children, {
      scrollTrigger: {
        trigger: eyebrowRef.current,
        start: "top 80%",
      },
      yPercent: 100,
      duration: 1,
      stagger: 0.05,
      ease: "power3.out",
    });

    // Content animations
    CONTENT.sections.forEach((_, index) => {
      const { imageRef, textRef } = contentRefs.current[index];

      // Image animation
      if (imageRef) {
        gsap.from(imageRef.querySelector(`.${styles.imageBlock}`), {
          scrollTrigger: {
            trigger: imageRef,
            start: "top 80%",
          },
          scale: 1.3,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      }

      // Text animation using SplitText
      if (splitTextRefs.current[index]) {
        gsap.from(splitTextRefs.current[index].children, {
          scrollTrigger: {
            trigger: textRef,
            start: "top 80%",
          },
          yPercent: 100,
          duration: 1,
          stagger: 0.05,
          ease: "power3.out",
        });
      }
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <h2 ref={eyebrowRef} className={styles.eyebrow}>
        <SplitTextBg>{CONTENT.eyebrow}</SplitTextBg>
      </h2>

      <div className={styles.content}>
        {CONTENT.sections.map((section, index) => (
          <div key={index} className={styles.section}>
            {section.image && (
              <div
                className={styles.imageWrapper}
                ref={(el) =>
                  (contentRefs.current[index] = {
                    ...contentRefs.current[index],
                    imageRef: el,
                  })
                }
              >
                <div className={styles.imageBlock}>
                  <MediaWCaption url={section.image} />
                </div>
              </div>
            )}

            <div
              className={styles.textBlock}
              ref={(el) =>
                (contentRefs.current[index] = {
                  ...contentRefs.current[index],
                  textRef: el,
                })
              }
            >
              <SplitTextBg
                color="orange"
                inline
                ref={(el) => (splitTextRefs.current[index] = el)}
              >
                <p>{section.text}</p>
              </SplitTextBg>
            </div>

            {section.stumpy && (
              <div className={styles.stumpyBlock}>
                <div className={styles.stumpyText}>
                  <SplitTextBg
                    color="forest"
                    ref={(el) => (stumpyTextRefs.current[index] = el)}
                  >
                    <p>{section.stumpyText}</p>
                  </SplitTextBg>
                </div>
                <div
                  className={styles.stumpyWrapper}
                  ref={(el) => (stumpyRefs.current[index] = el)}
                >
                  <Stumpy type="plank" color="orange" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const CONTENT = {
  eyebrow: "Benefits of Mass Timber",
  sections: [
    {
      text: "Lower embodied carbon – making wood products, especially locally, uses less energy than other building materials15",
      image: "/img/benefits/CMTC_Section4_1.jpg",
    },
    {
      text: "Stored carbon - dry wood is 50% biogenic carbon that is encapsulated for the life of the building!",
      image: "/img/benefits/CMTC_Section4_2.jpg",
      stumpy: true,
      stumpyText: "Half of me is carbon!",
    },

    {
      text: "Prefabrication leads to fast,16 quiet, and clean construction requiring fewer workers17 with less waste",
      image: "/img/benefits/CMTC_Section4_3.jpg",
    },
    {
      text: "Has a natural mechanism of resistance to fire: a protective char layer18",
    },
    {
      text: "Creates spaces that connect people with nature which has been scientifically proven to increase health – also known as biophilia19",

      stumpy: true,
      stumpyText: "I make you feel better!",
    },
    {
      text: "Provides aesthetics that differentiate from other buildings on the market ",
      image: "/img/benefits/CMTC_Section4_4.jpeg",
    },
    {
      text: "Supports a solution to affordable housing and alleviating the housing crisis20",
    },
  ],
};
