"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsapConfig";
import styles from "./style.module.scss";
import SplitTextBg from "@/components/SplitTextBg";
import { MediaWCaption } from "@/components/MediaWCaption";
import fieldPeterson from "@/public/img/action/Field-Peterson,-Colorado-State-Forest-Service.jpg";
import { PortableText } from '@portabletext/react';
import * as ST from "@bsmnt/scrollytelling";
import { mapToGlobalProgress } from "../FireInfoSection/utils";
import useWindowSize from "@/hooks/useWindowSize";
import Stumpy from "@/components/Stumpy";

export default function TakeAction({ content }) {
    const {pageTitle, pageMetadata, headline, orgHeadline, orgGroups, subHeadline, subcommittees, stumpyText, stumpyLink} = content[0];
    const containerRef = useRef(null);
    const [activeOrgGroup, setActiveOrgGroup] = useState(null);
    const headlineContainer = useRef();
    const headlineRef = useRef();
    const orgSectionRef = useRef();
    const orgTextRef = useRef();
    const subTextRef = useRef();
    const stumpTextRef = useRef();
    const { width } = useWindowSize();
    const smScreen = width < 1080;
    const phoneScreen = width < 900;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    const ctx = gsap.context(() => {
        if (headlineRef.current) {
            gsap.to(headlineRef.current, 
                {
                    scrollTrigger: {
                        trigger: headlineContainer.current,
                        start: "top 80px",
                        onEnter: () => {
                            headlineRef.current?.restart();
                        }, 
                    },
                    
                }
            )
        }

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
    
    });

    return () => ctx.revert();
  }, []);

  const updateActive = (i) => {
    if (activeOrgGroup == i) {
        setActiveOrgGroup(null)
    } else {
        setActiveOrgGroup(i);
    }
  }

  const handleStumpTextStart = useCallback(() => {
    stumpTextRef.current?.restart();
  }, []);

  const handleStumpTextReverse = useCallback(() => {
    stumpTextRef.current?.reverse();
  }, []);

  return (
    <ST.Root
        scrub={true}
        start="top top"
        end="bottom bottom"
        >
        <div className={styles.takeActionPageWrap} ref={containerRef}>
        <div className={styles.topContainer}>
            <MediaWCaption
                url={fieldPeterson}
                caption={"Field Peterson"}
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
            <div className={styles.orgDrawer}>
                {orgGroups.map((group,i)=> {
                    const {groupTitle, organizations} = group;
                    const isActive = groupTitle == activeOrgGroup;
                    return (
                        <div className={styles.orgDrawerItem} key={`org-drawer-${i}`}>
                            <div className={styles.titleContainer}>
                                <div className={`${styles.title} ${isActive && styles.active}`}
                                onClick={() => updateActive(i)}> 
                                    {groupTitle} 
                                </div> 
                                <div className={styles.arrowContainer}>
                                    <div className={styles.arrow}>
                                    </div>

                                </div>
                                <div className={`${styles.organizations} ${isActive && styles.active}`}>
                                    <ul className={styles.orgList}>
                                        {organizations.map((org, i) => {
                                            const {name, link} = org;

                                            if (link) {
                                                <li className={styles.orgItem} key={`org-list-item-${i}`}>
                                                    <a
                                                        key={i}
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        >
                                                    {name}
                                                </a>
                                              </li>
                                            } else {
                                                <li className={styles.orgItem}> {name} </li>
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
      }
      <div className={styles.subcommitteeSection}>
        {subHeadline && 
            <div className={styles.subHead}>
                <SplitTextBg ref={subTextRef} color="orange" inline>
                    <h2>{subHead}</h2>
                </SplitTextBg>
            </div>
        }
        <div className={styles.subList}>
            {subcommittees.map((sub, i) => {
                const {name, description} = sub;
                if (name) {
                    return (
                        <div className={styles.subItem} key={`sub-item-${i}`}>
                            <div className={styles.subTitle}>
                                {name}
                            </div>
                            {description && 
                                <div className={styles.description}>
                                    <PortableText value={description}/>
                                </div>
                            }
                        </div>
                    )
                }
                
            })}
        </div>
        {stumpyText &&
            <div className={styles.stumpySection}>
                 <div className={styles.stumpyWrap}>
                    <ST.Animation
                    tween={{
                        start: phoneScreen ? 65 : 60,
                        end: phoneScreen ? 75 : 70,
                        fromTo: [
                        { opacity: 0, scale: 0.2 },
                        { opacity: 1, scale: 1 },
                        ],
                        ease: "power2.out",
                    }}
                    >
                    <div className={styles.stumpy}>
                        <Stumpy type="tree" color="orangegreen" />
                    </div>
                    </ST.Animation>
                    <ST.Waypoint
                    at={phoneScreen ? 70 : 65}
                    onCall={handleStumpTextStart}
                    onReverseCall={handleStumpTextReverse}
                    />
                    <div className={`${styles.stumpyText}`}>
                    <SplitTextBg ref={stumpTextRef} color="forest" stumpy={true}>
                        <p>{stumpyText}</p>
                        {stumpyLink && "link here"}
                    </SplitTextBg>
                    </div>
                </div>
            </div>
        }
      </div>
    </div>
    </ST.Root>
  );
}
