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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each section when it comes into view
      contentRefs.current.forEach((content, index) => {
        const { textRef, imageRef, stumpyRef } = content;

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

        // Stumpy animations
        if (stumpyRef) {
          ScrollTrigger.create({
            trigger: textRef,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              gsap.to(stumpyRef, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
              });
            },
            onLeave: () => {
              gsap.to(stumpyRef, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
              });
            },
            onEnterBack: () => {
              gsap.to(stumpyRef, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
              });
            },
            onLeaveBack: () => {
              gsap.to(stumpyRef, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
              });
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <h2 ref={eyebrowRef} className={styles.eyebrow}>
        {CONTENT.eyebrow}
      </h2>

      <div className={styles.content}>
        {CONTENT.sections.map((section, index) => (
          <div key={index} className={styles.section}>
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

            <div
              className={styles.imageBlock}
              ref={(el) =>
                (contentRefs.current[index] = {
                  ...contentRefs.current[index],
                  imageRef: el,
                })
              }
            >
              <MediaWCaption url={section.image} />
            </div>

            {section.stumpy && (
              <div
                className={styles.stumpyBlock}
                ref={(el) =>
                  (contentRefs.current[index] = {
                    ...contentRefs.current[index],
                    stumpyRef: el,
                  })
                }
              >
                <Stumpy type="plank" color="orange" />
                <div className={styles.stumpyText}>
                  <SplitTextBg color="forest">
                    <p>{section.stumpyText}</p>
                  </SplitTextBg>
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
      stumpy: true,
      stumpyText: "Half of me is carbon!",
    },
    {
      text: "Stored carbon - dry wood is 50% biogenic carbon that is encapsulated for the life of the building!",
      image: "/img/benefits/CMTC_Section4_2.jpg",
      stumpy: true,
      stumpyText: "I make you feel better!",
    },
    {
      text: "Prefabrication leads to fast,16 quiet, and clean construction requiring fewer workers17 with less waste",
      image: "/img/benefits/CMTC_Section4_3.jpg",
    },
    {
      text: "Creates spaces that connect people with nature which has been scientifically proven to increase health – also known as biophilia19",
      image: "/img/benefits/CMTC_Section4_4.jpeg",
    },
  ],
};
