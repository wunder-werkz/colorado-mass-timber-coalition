'use client'

import { useEffect, useRef, useCallback } from "react";
import { PortableText } from "@portabletext/react";
import { gsap, SplitText } from "@/lib/gsapConfig";

import Button from "../Button";


import styles from "./style.module.scss";

const IntroSection = ({ introSection }) => {
    const { headline, image, imageUrl, imageHeight, imageWidth, copy, links } =
    introSection;

    const headlineRef = useRef(null);
    const headlineContainerRef = useRef();
    const contentRef = useRef();
    const contentContainerRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {

            const introAnimations = gsap.timeline({ });

            if (headlineRef && headlineRef.current)  {
                gsap.set(headlineRef, { autoAlpha: 0, y: 20 });
               let split = new SplitText(headlineRef.current, {
                    type: 'words, lines',
                    linesClass: styles.line,
                    reduceWhiteSpace: false,
                    lineThreshold: 0.5,
                 });
          

                introAnimations.from(split.words, {
                    duration: 0.25,
                    autoAlpha: 0, 
                    y: 100,
                    stagger: 0.15,
                });
            }
        
         
                if (contentRef) {
                introAnimations.to(contentRef.current, {
                    delay: 0.35,
                    x: 0,
                    duration: 0.35,
                }).to(contentContainerRef.current, {
                    delay: 0.7,
                    opacity: 1,
                    duration: 0.5,
                });
            }
        });
        return () => ctx.revert();
    }, [contentRef, contentContainerRef]);

  const renderLinks = () => {
    return (
      <div
        className={`buttons-container ${styles.buttonsContainer}`}
      >
        {links &&
          links.map((link, i) => {
            if (link) {
                return (
                    <Button
                        key={`intro-button-${i}`}
                        href={link.url ? link.url : link.downloadUrl}
                        newWindow={link.newWindow}
                        downloadPdf={link.downloadPdf}
                        downloadUrl={link.downloadUrl}
                        variant="secondary"
                        color="orange"
                        fill={true}
                    >
                        {link.linkTitle ? link.linkTitle : "Learn More"}
                  </Button>
                );
            }
            
          })}
      </div>
    );
  };

  return (
    <section className={styles.introSection}>
        {headline && 
            <div className={styles.headlineContainer} ref={headlineContainerRef}>
                <h1 > <span ref={headlineRef}>{headline}</span> </h1>
            </div>
        }
      <div className={styles.textContent} ref={contentRef}>
        <div className={styles.contentContainer} ref={contentContainerRef}>
          {copy && (
            <div className={styles.textContainer}>
              <PortableText value={copy} />
            </div>
          )}
          {links && links.length > 0 ? renderLinks() : ""}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
