"use client";
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsapConfig";
import styles from "./style.module.scss";

import { PortableText } from '@portabletext/react';

export default function SubList({ subcommittees }) {
   const subContainer = useRef();
   const itemsRef = useRef();
   itemsRef.current = [];

   const addToRefs = (el) => {
        if (el && !itemsRef.current.includes(el)) {
        itemsRef.current.push(el)
        }
    }

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(itemsRef.current, {
            scrollTrigger: {
                trigger: subContainer.current,
                start: "top center",
            },
            stagger: 0.25,
            opacity: 0,
            y: "100px",
        })

    
    });

    return () => ctx.revert();
  }, []);


  return (
    <div className={styles.subList} ref={subContainer}>
        {subcommittees.map((sub, i) => {
            const {name, description} = sub;
            if (name) {
                return (
                    <div className={styles.subItem} key={`sub-item-${i}`} ref={addToRefs}>
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
  );
}
