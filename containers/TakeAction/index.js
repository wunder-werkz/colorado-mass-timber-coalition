"use client";
import {useRef, useEffect, useState, useCallback } from "react";
import { gsap,ScrollTrigger } from "@/lib/gsapConfig";
import styles from "./style.module.scss";
import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";
import fieldPeterson from "@/public/img/action/Y-100-4.jpg";
import Stumpy from "@/components/Stumpy";
import SubList from "./subList";
import OrgDrawer from "./orgDrawer";
import TextLink from "@/components/TextLink";

export default function TakeAction({ content }) {
    const {pageTitle, pageMetadata, headline, orgHeadline, orgGroups, subHeadline, subcommittees, stumpyText, stumpyLink} = content[0];
    const containerRef = useRef(null);
    const headlineContainer = useRef();
    const headlineRef = useRef();
    const orgSectionRef = useRef();
    const orgTextRef = useRef();
    const subContainerRef = useRef();
    const subTextRef = useRef();
    const stumpTextRef = useRef();
    const stumpyRef = useRef();
    const stumpSection = useRef();
    const splitHeadline = useRef();
    const splitRef = useRef(null)
    const [deviceWidth, setDeviceWidth] = useState(0)

    const handleSplitTextAnimation = useCallback(() => {
        headlineRef.current?.restart();
      }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
        }
  
        const ctx = gsap.context(() => {

            const initialAnimations = gsap.timeline({ delay: 0.5, onComplete: () => handleSplitTextAnimation() });

            initialAnimations.to(headlineContainer.current, {opacity: 1});
            

        if (orgTextRef.current) {
            gsap.to(orgTextRef.current, {
                scrollTrigger: {
                    trigger: orgSectionRef.current, 
                    start: "top 50%",
                    onEnter: () => {
                        orgTextRef.current?.restart();
                    }
                }
            })
        }

        if (subTextRef.current) {
            gsap.to(subTextRef.current, {
                scrollTrigger: {
                    trigger: subContainerRef.current, 
                    start: "top 50%", 
                    onEnter: () => {
                        subTextRef.current?.restart();
                    }
                }
            })
        }

        gsap.fromTo(
            stumpyRef.current, 
            { 
                opacity: 0, 
                scale: 0.2,
                rotate: "10deg", 
                x: 100,
            },
            { 
                opacity: 1, 
                scale: 1,
                ease: "power2.out", 
                duration: 1,
                rotate: 0,
                x: 0,
                scrollTrigger: {
                    trigger: stumpSection.current, 
                    start: "top 65%"
                }
            }
        );

        gsap.to(stumpTextRef.current, {
            scrollTrigger: {
                trigger: stumpSection.current, 
                start: "top 65%", 
                onEnter: () => {
                    stumpTextRef.current?.restart();
                }
            }
        })
        
    });

    return () => {
        ctx.revert();
        initialAnimations.kill();
    };
 
  }, [headlineRef, stumpTextRef, orgTextRef, window]);

  const createSplitText = () => {
    if (headlineRef.current) {
      if (splitRef.current) {
        splitRef.current.revert()
      }

      const newSplit = new SplitText(headlineRef.current, {
        linesClass: 'textLine',
        type: 'lines',
        lineThreshold: 0.75,
      })

      splitRef.current = newSplit
      setDeviceWidth(window.innerWidth)
      return newSplit
    }
    return null
  }

  return (
    <div className={styles.takeActionPageWrap} ref={containerRef}>
        <div className={styles.topContainer}>
            <MediaWCaption
                url={fieldPeterson}
                caption={"Colorado Forest"}
                imagePosition="center bottom"
            />
            <div className={styles.mediaWCaptionInner}></div>
            {headline && 
                <div className={styles.headline} ref={headlineContainer}> 
                    <SplitTextBg ref={headlineRef} color="cream" inline>
                        <h1>{headline}</h1>
                    </SplitTextBg>
                </div>
            }
        </div>
      {(orgGroups && orgGroups.length > 0) &&
        <div className={styles.orgGroupsSection} ref={orgSectionRef}>
            {orgHeadline && 
              <SplitTextBg ref={orgTextRef} color="orange" inline>
              <h2>{orgHeadline}</h2>
            </SplitTextBg>
            }
            <OrgDrawer orgGroups={orgGroups} />
        </div>
      }
      <div className={styles.subcommitteeSection} ref={subContainerRef}>
        {subHeadline && 
            <div className={styles.subHead}>
                <SplitTextBg ref={subTextRef} color="orange" inline>
                    <h2>{subHeadline}</h2>
                </SplitTextBg>
            </div>
        }
        {(subcommittees && subcommittees.length > 0) && < SubList subcommittees={subcommittees}/>}
       
        {stumpyText &&
            <div className={styles.stumpySection} ref={stumpSection}>
                 <div className={styles.stumpyWrap}>
                    <div className={styles.stumpy} ref={stumpyRef}>
                        <Stumpy type="stump" color="orange" />
                    </div>
                    <div className={styles.stumpyText}>
                        <SplitTextBg ref={stumpTextRef} color="forest" stumpy={true}>
                            <p>{stumpyText}
                            {stumpyLink && 
                                <span>
                                    <TextLink link={stumpyLink[0]} />
                                </span>
                            }
                            </p>
                        </SplitTextBg>
                    </div>
                </div>
            </div>
        }
      </div>
    </div>
  );
}
