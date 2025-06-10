"use client";
import { useEffect, useRef} from "react";
import styles from "./style.module.scss";
import { gsap } from "@/lib/gsapConfig";
import SplitTextBg from "@/components/SplitTextBg";

const Mission = ({ mission }) => {  
    const missionRef= useRef();
    const missionContainerRef = useRef();

    useEffect(() => {
        if (missionRef.current) {
            gsap.to(missionRef.current, 
                {
                    scrollTrigger: {
                        trigger: missionContainerRef.current,
                        start: "top 80%",
                        onEnter: () => {
                            missionRef.current?.restart();
                        }, 
                    },
                    
                }
            )
        }
    }, []);

    return (
        <div className={styles.missionContainer} ref={missionContainerRef}>
            <SplitTextBg ref={missionRef} color="orange" inline>
                <h1>{mission} </h1>
            </SplitTextBg>
        </div>
    )
};

export default Mission;
