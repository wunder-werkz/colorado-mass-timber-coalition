'use client'

import { useEffect, useRef } from "react";
import { PortableText } from "@portabletext/react";
import { gsap } from "gsap";

import Button from "../Button";
import SplitTextBg from "@/components/SplitTextBg";

import styles from "./style.module.scss";

const IntroSection = ({ introSection }) => {
    const { headline, image, imageUrl, imageHeight, imageWidth, copy, links } =
    introSection;

    const headlineRef = useRef();
    const headlineContainerRef = useRef();
    const contentRef = useRef();
    const contentContainerRef = useRef();

    useEffect(() => {
        if (headlineRef.current) {
            gsap.to(headlineRef.current, 
                {
                    scrollTrigger: {
                        trigger: headlineContainerRef.current,
                        start: "top 80%",
                        onEnter: () => {
                            headlineRef.current?.restart();
                        }, 
                    },
                    
                }
            )
        }
        if (contentRef) {
        gsap.to(contentRef.current, {
            delay: 0.35,
            x: 0,
            duration: 0.35,
        });
        }
        if (contentContainerRef) {
        gsap.to(contentContainerRef.current, {
            delay: 0.7,
            opacity: 1,
            duration: 0.5,
        });
        }
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
                        href={link.downloadUrl}
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
                <SplitTextBg ref={headlineRef} color="orange" inline>
                    <h1>{headline} </h1>
                </SplitTextBg>
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
