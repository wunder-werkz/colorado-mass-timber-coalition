"use client";

import { useRef, useCallback } from "react";
import * as ST from "@bsmnt/scrollytelling";
import SplitTextBg from "@/components/SplitTextBg";
import { PortableText } from "@portabletext/react";
import styles from "./style.module.scss";
import Button
 from "@/components/Button";
export default function Maps({ maps, mapsText, title }) {
  const splitTextRef = useRef(null);
  const splitTextCopyRef = useRef(null);

  // Memoized callbacks for animations
  const handleSplitTextStart = useCallback(() => {
    splitTextRef.current?.restart();
  }, []);

  const handleSplitTextReverse = useCallback(() => {
    splitTextRef.current?.reverse();
  }, []);

  const handleSplitTextCopyStart = useCallback(() => {
    splitTextCopyRef.current?.restart();
  }, []);

  const handleSplitTextCopyReverse = useCallback(() => {
    splitTextCopyRef.current?.reverse();
  }, []);

  return (
    <ST.Root scrub={true} start="top center" end="bottom bottom">
      <div className={styles.container}>
        <ST.Waypoint
          at={1}
          onCall={handleSplitTextStart}
          onReverseCall={handleSplitTextReverse}
        />
        <ST.Waypoint
          at={1}
          onCall={handleSplitTextCopyStart}
          onReverseCall={handleSplitTextCopyReverse}
        />

        <div className={styles.titleWrapper}>
          <SplitTextBg ref={splitTextRef} color="orange" inline>
            <h2>{title ? title : "Our Financial maps"}</h2>
          </SplitTextBg>
          {mapsText &&
            <SplitTextBg ref={splitTextCopyRef} color="cream" inline>
              <div className={styles.body}>
                <PortableText value={mapsText} />
              </div>
            </SplitTextBg>
          }
        </div>

        <div className={styles.mapsList}>
            {maps && maps.map((singleMap, index) => {
                const {embedUrl, link, title} = singleMap;
                return (
                    <div className={styles.mapContainer}>
                        <div className={styles.titleRow}>
                        {title && <h3> {title} </h3>}
                        {link &&  
                            <Button
                            key={`map-button-${link[0]._id}`}
                            href={link[0].url ? link[0].url : null}
                            newWindow={link[0].newWindow}
                            downloadPdf={link[0].downloadPdf}
                            downloadUrl={link[0].downloadUrl}
                            variant="secondary"
                            color="forest"
                            fill={false}
                            >
                            {link[0].linkTitle ? link[0].linkTitle : "Learn More"}
                            </Button>}
                        </div>
                        {embedUrl && <div className={styles.mapWrap}>
                            <iframe src={embedUrl} width="100%" height="800px"></iframe>
                        </div>
                        }
                    </div>
                )
            })}
        </div>
      </div>
    </ST.Root>
  );
}
