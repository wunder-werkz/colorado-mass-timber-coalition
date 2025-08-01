"use client";
import { useEffect, useRef} from "react";
import styles from "./style.module.scss";
import { gsap } from "@/lib/gsapConfig";
import { PortableText } from '@portabletext/react';
import Button from "../Button";
const TakeActionBar = ({ headline, copy, link}) => {  
    const sectionRef= useRef();
    const barRef = useRef();
    const headlineRef = useRef();
    const contentRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current, 
                start: "top 70%", 
                toggleActions: "play none none reverse",
            }
        }).from(barRef.current, {
            x: "-100vw"
        }).from(headlineRef.current, {
            opacity: 0,
            y: "100px"
        }).from(contentRef.current, {
            opacity: 0,
            y: "100px"
        });
    });
    return () => ctx.revert();
    }, [sectionRef, barRef, headlineRef, contentRef]);

    return (
        <div className={styles.takeActionSection} ref={sectionRef}>
            <div className={styles.bar} ref={barRef}>
                <div className={styles.headline} ref={headlineRef}>
                    <h1>{headline}</h1>
                </div>
                <div className={styles.content} ref={contentRef}>
                    {copy && <div className={styles.textWrap}><PortableText value={copy}/></div>}
                    {(link && link[0]) &&  <Button
                          href={link[0].url}
                          newWindow={link[0].newWindow}
                          downloadPdf={link[0].downloadPdf}
                          downloadUrl={link[0].downloadUrl}
                          variant="primary"
                          color="forest"
                          fill={false}
                        >
                          {link[0].linkTitle ? link[0].linkTitle : "Learn More"}
                        </Button>}
                </div>
            </div>
           
        </div>
    )
};

export default TakeActionBar;
