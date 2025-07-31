"use client";
import { useEffect, useRef} from "react";
import styles from "./style.module.scss";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { PortableText } from '@portabletext/react';
import Button from "../../Button";

const ListItem = ({ listItem, even }) => {  
    const { headline, copy, link } = listItem;
    const sectionRef= useRef();
    const barRef = useRef();
    const headlineRef = useRef();
    const contentRef = useRef();

    useEffect(() => {
        ScrollTrigger.refresh();
        gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current, 
                start: "top 70%", 
                toggleActions: "play none none none",
                // markers: true
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
    }, []);

    return (
        <div className={`${styles.listItem} ${even ? styles.even : styles.odd}`} ref={sectionRef}>
            <div className={styles.bar} ref={barRef}>
                <div className={styles.headline} ref={headlineRef}>
                    <h2>{headline}</h2>
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

export default ListItem;
