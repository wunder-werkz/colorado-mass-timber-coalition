"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsapConfig";
import styles from "./style.module.scss";

export default function OrgDrawer({ orgGroups }) {
    const drawerContainer = useRef();
    const drawerItems = useRef();
    drawerItems.current = [];
    const [activeOrgGroup, setActiveOrgGroup] = useState(null);
   
    const addToRefs = (el) => {
        if (el && !drawerItems.current.includes(el)) {
        drawerItems.current.push(el)
        }
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(drawerItems.current, {
                scrollTrigger: {
                    trigger: drawerContainer.current,
                    start: "top center",
                },
                stagger: 0.25,
                opacity: 0,
                x: "-100px",
            })
    
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


  return (
    <div className={styles.orgDrawer} ref={drawerContainer}>
        {orgGroups.map((group,i)=> {
            const {groupTitle, organizations} = group;
            const isActive = groupTitle == activeOrgGroup;
            return (
                <div className={styles.orgDrawerItem} key={`org-drawer-${i}`} ref={addToRefs}>
                    <div className={`${styles.titleContainer} ${isActive && styles.active}`} onClick={() => updateActive(groupTitle)}>
                        <div className={styles.title}
                        > 
                            {groupTitle} 
                        </div> 
                        <div className={styles.arrowContainer}>
                            <div className={styles.arrow}>
                            </div>

                        </div>
                    </div>
                    <div className={`${styles.organizations} ${isActive && styles.active}`}>
                        <ul className={styles.orgList}>
                            {organizations.map((org, i) => {
                                const {name, link} = org;

                                if (link) {
                                    return ( 
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
                                    )
                                } else {
                                    return (
                                        <li className={styles.orgItem} key={`org-list-item-${i}`}> {name} </li>
                                    )
                                    
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )
        })}
    
    </div>
  );
}
