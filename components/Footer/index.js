"use client";
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsapConfig";
import styles from "./style.module.scss";

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Get footer height
    const footerHeight = footerRef.current.offsetHeight;

    // Add padding to body to account for fixed footer
    document.body.style.paddingBottom = `${footerHeight}px`;
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.content}>
        <p>© 2024 Colorado Mass Timber Coalition</p>
        <nav>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
