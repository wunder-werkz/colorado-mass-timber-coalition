"use client";
import { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { gsap } from "@/lib/gsapConfig";
import { PortableText } from "@portabletext/react";
import SplitTextBg from "../SplitTextBg";
import ListItem from "./ListItem";

const ListSection = ({ listSection }) => {
  const { headline, copy, listItems } = listSection;
  const headlineListRef = useRef();
  const headlineContainerRef = useRef();
  const contentRef = useRef();
  const contentContainerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineListRef.current) {
        gsap.to(headlineListRef.current, {
          scrollTrigger: {
            trigger: headlineContainerRef.current,
            start: "top 80%",
            onEnter: () => {
              headlineListRef.current?.restart();
            },
          },
        });
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
    });
    return () => ctx.revert();
  }, [contentRef, contentContainerRef]);

  const renderListItems = () => {
    return listItems.map((listItem, i) => {
      const even = (i + 1) % 2 === 0;
      return (
        <ListItem listItem={listItem} even={even} key={`list-item-${i}`} />
      );
    });
  };
  return (
    <section className={styles.listSection}>
      {headline && (
        <div className={styles.headlineContainer} ref={headlineContainerRef}>
          <SplitTextBg ref={headlineListRef} color="orange" inline>
            <h1>{headline} </h1>
          </SplitTextBg>
        </div>
      )}
      <div className={styles.textContent} ref={contentRef}>
        <div className={styles.contentContainer} ref={contentContainerRef}>
          {copy && (
            <div className={styles.textContainer}>
              <PortableText value={copy} />
            </div>
          )}
          {listItems && listItems.length > 0 ? renderListItems() : ""}
        </div>
      </div>
    </section>
  );
};

export default ListSection;
