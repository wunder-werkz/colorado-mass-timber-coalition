"use client";
import { useEffect, useRef, useState } from "react";

import ImageRender from "../ImageRender";

import { DotSvg, NextSvg, PrevSvg } from "./Svg";
import Button from "../Button";
import styles from "./style.module.scss";

import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

const ImageSliderSection = ({ images }) => {  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);
  const tempIndex = useRef(currentIndex);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const setupScrollTrigger = () => {
      if (sliderRef.current) {
        const slides = sliderRef.current.children;
        if (slides) {
          gsap.set(slides, {
            visibility: "hidden",
            scale: 0.5,
            opacity: 0,
            zIndex: 0,
          });
        }
        if (slides[images.length - 1]) {
          gsap.set(slides[images.length - 1], {
            visibility: "visible",
            scale: 0.5,
            opacity: 1,
            x: "-100%",
            zIndex: 0,
          });
        }
        if (slides[0]) {
          gsap.set(slides[0], {
            visibility: "visible",
            scale: 1,
            opacity: 1,
            x: "0%",
            zIndex: 2,
          });
        }
        if (slides[1]) {
          gsap.set(slides[1], {
            visibility: "visible",
            scale: 0.5,
            opacity: 1,
            x: "100%",
            zIndex: 0,
          });
        }
        if (imageContainerRef.current && imageContainerRef.current.children) {
          gsap.set(
            [imageContainerRef.current.children, sliderRef.current.children],
            {
              opacity: 0,
              y: 50,
            },
          );
          gsap.to(
            [imageContainerRef.current.children, sliderRef.current.children],
            {
              opacity: 1,
              y: 0,
              stagger: 0.2,
              scrollTrigger: {
                normalizeScroll: true,
                trigger: imageContainerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      }
      ScrollTrigger.refresh();
    };
    const timeoutId = setTimeout(setupScrollTrigger, 250);
    function durationSlider() {
      var listItems = images.length;
      var count = 0;
      setInterval(function() {
        count += 1;
        if (count >= listItems) {
          count = 0
        }
        // animateSlider("next");
      }, 5000)
    }
    durationSlider()
    return () => clearTimeout(timeoutId);
  }, [images]);

  const animateSlider = (direction) => {
    return new Promise((resolve) => {
      setIsAnimating(true);
      const slides = sliderRef.current.children;
      const totalSlides = images.length;

      const timeline = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          tempIndex.current =
            direction === "next"
              ? (tempIndex.current + 1) % totalSlides
              : (tempIndex.current - 1 + totalSlides) % totalSlides;

          setCurrentIndex(tempIndex.current);
          resolve();
        },
      });

      if (direction === "next") {
        const nextIndex = (tempIndex.current + 2) % totalSlides;
        if (slides[nextIndex]) {
          gsap.set(slides[nextIndex], {
            visibility: "visible",
            scale: 0,
            opacity: 0,
            zIndex: 1,
            x: "100%",
          });
        }
        if (
          slides[(tempIndex.current - 1 + totalSlides) % totalSlides] &&
          slides[tempIndex.current] &&
          slides[(tempIndex.current + 1) % totalSlides] &&
          slides[nextIndex]
        ) {
          timeline
            .to(
              slides[(tempIndex.current - 1 + totalSlides) % totalSlides],
              {
                scale: 0,
                opacity: 0,
                zIndex: 0,
                duration: 0.5,
                ease: "power2.inOut",
              },
              0,
            )
            .to(
              slides[tempIndex.current],
              {
                scale: 0.5,
                x: "-100%",
                duration: 0.5,
                zIndex: 1,
                ease: "power2.inOut",
              },
              0,
            )
            .to(
              slides[(tempIndex.current + 1) % totalSlides],
              {
                scale: 1,
                x: "0%",
                zIndex: 3,
                duration: 0.5,
                ease: "power2.inOut",
              },
              0.1,
            )
            .to(
              slides[nextIndex],
              {
                scale: 0.5,
                opacity: 1,
                zIndex: 1,
                x: "100%",
                duration: 0.5,
                ease: "power2.inOut",
              },
              0.1,
            );
        }
      } else {
        const prevIndex = (tempIndex.current - 2 + totalSlides) % totalSlides;
        if (slides[prevIndex]) {
          gsap.set(slides[prevIndex], {
            visibility: "visible",
            scale: 0,
            opacity: 0,
            zIndex: 1,
            x: "-100%",
            zIndex: 1,
          });
        }
        if (
          slides[(tempIndex.current + 1) % totalSlides] &&
          slides[tempIndex.current] &&
          slides[(tempIndex.current - 1 + totalSlides) % totalSlides] &&
          slides[prevIndex]
        ) {
          timeline
            .to(
              slides[(tempIndex.current + 1) % totalSlides],
              {
                scale: 0,
                opacity: 0,
                zIndex: 0,
                duration: 0.5,
                ease: "power2.inOut",
              },
              0,
            )
            .to(
              slides[tempIndex.current],
              {
                scale: 0.5,
                x: "100%",
                zIndex: 1,
                duration: 0.5,
                ease: "power2.inOut",
              },
              0,
            )
            .to(
              slides[(tempIndex.current - 1 + totalSlides) % totalSlides],
              {
                scale: 1,
                x: "0%",
                zIndex: 3,
                duration: 0.5,
                ease: "power2.inOut",
              },
              0.1,
            )
            .to(
              slides[prevIndex],
              {
                scale: 0.5,
                opacity: 1,
                zIndex: 2,
                x: "-100%",
                duration: 0.5,
                ease: "power2.inOut",
              },
              0.1,
            );
        }
      }
    });
  };

  const animateToIndex = async (targetIndex) => {
    if (isAnimating || targetIndex === currentIndex) return;

    const totalSlides = images.length;
    const forwardSteps =
      (targetIndex - currentIndex + totalSlides) % totalSlides;
    const backwardSteps =
      (currentIndex - targetIndex + totalSlides) % totalSlides;

    const direction = forwardSteps <= backwardSteps ? "next" : "prev";
    const steps = Math.min(forwardSteps, backwardSteps);

    for (let i = 0; i < steps; i++) {
      await animateSlider(direction);
    }
  };

  if (images && images.length >= 4) {
    return (
      <section
        className={styles.imageSliderSection}
      >
        <>
          <div
            className={`${styles.imageContainer} imageContainer`}
            ref={imageContainerRef}
          >
            <button
              className={`${styles.prevButton} ${styles.button} `}
              onClick={() => !isAnimating && animateSlider("prev")}
              disabled={isAnimating}
            >
              <PrevSvg />
            </button>
            <div className={styles.sliderWrapper} ref={sliderRef}>
              {images.map((slide, i) => {
                const {image, headline, link} = slide;
                const isActive = currentIndex == i;
                const hasLink = link && link[0];
                return (
                  <div className={`${styles.slideItem} ${isActive && styles.active}`} key={`slide-${i}`}>
                 
                  <div
                    className={styles.imageContainer}
                  >
                     {(headline || link) && 
                    <div className={`${styles.textContainer} ${hasLink && styles.hasLink}`}>
                      {headline && <div className={styles.headline}> 
                        <span>
                          {headline}
                        </span>
                      </div>}
                      {hasLink && 
                        <div className={styles.buttonContainer}>
                          <Button
                          href={link[0].url}
                          newWindow={link[0].newWindow}
                          downloadPdf={link[0].downloadPdf}
                          downloadUrl={link[0].downloadUrl}
                          variant="secondary"
                          color="orange"
                          fill={true}
                          large={true}
                        >
                          {link[0].linkTitle ? link[0].linkTitle : "Learn More"}
                        </Button>
                        </div>
                      }
                    </div>
                  }
                  {<div className={`${styles.imageOverlay} ${isActive && styles.isActive}`}></div>}
                    <ImageRender
                      image={image}
                      size="medium"
                      priority="lazy"
                    />
                  </div>
                </div>
                )
              })}
            </div>
            <button
              className={`${styles.nextButton} ${styles.button}`}
              onClick={() => !isAnimating && animateSlider("next")}
              disabled={isAnimating}
            >
              <NextSvg />
            </button>
          </div>
          <div className={styles.controls}>
            {images.map((image, i) => (
              <div
                className={
                  styles.dot + " " + (i === currentIndex && styles.active)
                }
                key={`dot-${i}`}
                onClick={() => animateToIndex(i)}
              >
                <DotSvg />
              </div>
            ))}
          </div>
        </>
      </section>
    );
  } else return;
};

export default ImageSliderSection;
