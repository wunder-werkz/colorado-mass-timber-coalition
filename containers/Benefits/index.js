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
      contentRefs.current.forEach((content, index) => {
        const { textRef, imageRef } = content;

        const parallaxDistance = index % 2 === 0 ? 100 : -100;
        const parallaxSpeed = 0.5 + index * 0.1;

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

        ScrollTrigger.create({
          trigger: textRef,
          start: "top 80%",
          onEnter: () => splitTextRefs.current[index]?.restart(),
          onLeaveBack: () => splitTextRefs.current[index]?.reverse(),
        });
      });

      ScrollTrigger.create({
        trigger: containerRef.current.querySelector(`.${styles.eyebrow}`),
        start: "top 80%",
        onEnter: () => eyebrowRef.current?.restart(),
        onLeaveBack: () => eyebrowRef.current?.reverse(),
      });

      stumpyRefs.current.forEach((stumpyRef, index) => {
        if (!stumpyRef) return;

        gsap.set(stumpyRef, {
          scale: 0.8,
          opacity: 0,
        });

        ScrollTrigger.create({
          trigger: stumpyRef,
          start: "top 80%",
          onEnter: () => {
            gsap.to(stumpyRef, {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            });

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

    CONTENT.sections.forEach((_, index) => {
      const { imageRef, textRef } = contentRefs.current[index];

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
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.eyebrow}>
        <SplitTextBg color="cream" ref={eyebrowRef}>
          <p>{CONTENT.eyebrow}</p>
        </SplitTextBg>
      </div>

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
                  <MediaWCaption
                    url={section.image.url}
                    caption={section.image.caption}
                  />
                </div>
              </div>
            )}

            <div
              className={section.image ? styles.textHasImage : styles.textBlock}
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
                <p dangerouslySetInnerHTML={{ __html: section.text }} />
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
      text: "Lower embodied carbon – making wood products, especially locally, uses less energy and emits less carbon than other building materials<sup>15</sup>",
    },
    {
      text: "Stored carbon - dry wood is 50% biogenic carbon that is encapsulated for the life of the building and even longer if salvaged and reused!",
      image: {
        url: "/img/benefits/CMTC_Section4_1.jpg",
        caption: "Platte Fifteen - OZ Architecture",
      },
    },

    {
      text: "Prefabrication leads to fast,<sup>16</sup> quiet, and clean construction requiring fewer workers<sup>17</sup> with less waste",
      image: {
        url: "/img/benefits/TimberAge.jpg",
        caption: "Timber Age Systems",
      },
      stumpy: true,
      stumpyText: "Half of me is carbon!",
    },
    {
      text: "Has a natural mechanism of resistance to fire: a protective char layer<sup>18</sup>",
      image: {
        url: "/img/benefits/CMTC_Section4_3.png",
        caption: "Timber Lab",
      },
    },
    {
      text: "Creates spaces that connect people with nature which has been scientifically proven to increase health – also known as biophilia<sup>19</sup>",
      stumpy: true,
      stumpyText: "I make you feel better!",
    },
    {
      text: "Provides aesthetics that differentiate from other buildings on the market ",
      image: {
        url: "/img/benefits/Provides Aesthetics.jpg",
        caption: "The Loading Dock - OZ Architecture",
      },
    },
    {
      text: "Supports a solution to affordable housing and alleviating the housing crisis<sup>20</sup>",
    },
  ],
};
