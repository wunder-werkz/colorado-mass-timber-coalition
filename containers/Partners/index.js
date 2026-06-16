"use client";

import { useRef, useCallback, useState } from "react";
import * as ST from "@bsmnt/scrollytelling";
import SplitTextBg from "@/components/SplitTextBg";
import { PortableText } from "@portabletext/react";
import GatedDownloadModal from "@/components/GatedDownloadModal";
import styles from "./styles.module.scss";

export default function Partners({ partners, partnersText, title, animation }) {
  const splitTextRef = useRef(null);
  const splitTextCopyRef = useRef(null);
  const [gatedResource, setGatedResource] = useState(null);

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

  const openGate = (partner) =>
    setGatedResource({
      title: partner.name,
      label: partner.name,
      downloadUrl: partner.downloadUrl,
      downloadPdf: partner.downloadPdf,
    });

  // Renders a single partner. A gated PDF opens the email modal; everything
  // else stays a plain link as before.
  const renderPartner = (partner, index) => {
    if (partner.infoGated && partner.downloadPdf) {
      return (
        <a
          key={index}
          role="button"
          tabIndex={0}
          style={{ cursor: "pointer" }}
          className={`${styles.partnerItem} ${styles.defaultOn}`}
          onClick={() => openGate(partner)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openGate(partner);
            }
          }}
        >
          {partner.name}
        </a>
      );
    }

    if (partner.downloadPdf) {
      return (
        <a
          key={index}
          href={partner.downloadUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.partnerItem} ${styles.defaultOn}`}
        >
          {partner.name}
        </a>
      );
    }

    return (
      <a
        key={index}
        href={partner.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.partnerItem} ${styles.defaultOn}`}
      >
        {partner.name}
      </a>
    );
  };

  if (animation === false) {
    return (
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h2><span className={styles.colorBar}>{title ? title : "Our Financial Partners"}</span></h2>
          {partnersText &&
            <div className={styles.body}>
              <PortableText value={partnersText} />
                </div>
          }
        </div>
        <div className={styles.partnersList}>
          {partners && partners.map((partner, index) => renderPartner(partner, index))}
          </div>
        <GatedDownloadModal
          isOpen={!!gatedResource}
          onClose={() => setGatedResource(null)}
          resource={gatedResource}
        />
        </div>
    );
  } else {
    return (
      <ST.Root scrub={true} start="top 80%" end="bottom bottom">
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
              <h2>{title ? title : "Our Financial Partners"}</h2>
            </SplitTextBg>
            {partnersText &&
              <SplitTextBg ref={splitTextCopyRef} color="cream" inline>
                <div className={styles.body}>
                  <PortableText value={partnersText} />
                </div>
             </SplitTextBg>
            }
          </div>
  
          <div className={styles.partnersList}>
            <ST.Stagger
              overlap={0.2}
              tween={{
                start: 5,
                end: 90,
                to: { opacity: 1, y: 0 },
                
              }}
            >
              {partners && partners.map((partner, index) => renderPartner(partner, index))}
            </ST.Stagger>
          </div>
        </div>
        <GatedDownloadModal
          isOpen={!!gatedResource}
          onClose={() => setGatedResource(null)}
          resource={gatedResource}
        />
      </ST.Root>
    );
  }

}
