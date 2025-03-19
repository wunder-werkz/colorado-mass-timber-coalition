"use client";
import { useRef, useEffect } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import FooterLogo from "../SVG/FooterLogo";

import NewsletterSignup from "@/components/NewsletterSignup";
import styles from "./style.module.scss";

import Stumpy from "@/components/Stumpy";

import { Email, LinkedIn, Instagram } from "@/components/SVG/Social";

export default function Footer({ contactEmail }) {
  const SOCIAL_LINKS = [
    {
      icon: <Email />,
      url: `mailto:${contactEmail}`,
      ariaLabel: "Email",
    },
    {
      icon: <LinkedIn />,
      url: "https://www.linkedin.com/company/comtc/",
      ariaLabel: "Linked In",
    },
    {
      icon: <Instagram />,
      url: "https://www.instagram.com/ColoradoMassTimberCoalition/",
      ariaLabel: "Instagram",
    },
  ];

  // Create refs for animated elements
  const newsletterRef = useRef(null);
  const stumpyRef = useRef(null);
  const socialLinksRef = useRef([]);
  const logoRef = useRef(null);

  // useEffect(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: newsletterRef.current,
  //       start: "top 80%",
  //       end: "bottom bottom",
  //       debug: true,
  //     },
  //   });

  //   // Newsletter animation
  //   tl.fromTo(
  //     newsletterRef.current,
  //     { opacity: 0, y: 30 },
  //     { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
  //   );

  //   // Stumpy animation
  //   tl.fromTo(
  //     stumpyRef.current,
  //     { opacity: 0, scale: 0.8 },
  //     { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
  //     ">0.2" // Delay after previous animation
  //   );

  //   // Social links animation
  //   socialLinksRef.current.forEach((link, index) => {
  //     tl.fromTo(
  //       link,
  //       { opacity: 0, y: 20 },
  //       { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
  //       ">-0.2" // Slight overlap with previous animation
  //     );
  //   });

  //   // Logo animation
  //   tl.fromTo(
  //     logoRef.current,
  //     { opacity: 0, y: 20 },
  //     { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
  //     ">0.2"
  //   );

  //   // Cleanup
  //   return () => {
  //     if (tl) {
  //       tl.kill();
  //       tl.scrollTrigger?.kill();
  //     }
  //     // Refresh ScrollTrigger on cleanup
  //     ScrollTrigger.refresh();
  //   };
  // }, []);

  // // Add a second useEffect to handle route changes
  // useEffect(() => {
  //   // Refresh ScrollTrigger after a short delay to ensure DOM is ready
  //   const refreshTimeout = setTimeout(() => {
  //     ScrollTrigger.refresh();
  //   }, 100);

  //   return () => clearTimeout(refreshTimeout);
  // }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.newsletter} ref={newsletterRef}>
          <NewsletterSignup />
        </div>

        <div className={styles.socials}>
          <div className={styles.stumpyWrap} ref={stumpyRef}>
            <Stumpy type="plank" color="orange" />
          </div>

          <div className={styles.socialWrap}>
            {SOCIAL_LINKS.map((link, index) => (
              <a
                key={link.url}
                ref={(el) => (socialLinksRef.current[index] = el)}
                href={link.url}
                className={styles.url}
                aria-label={link.ariaLabel}
                title={link.ariaLabel}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.logo} ref={logoRef}>
        <FooterLogo />
      </div>
    </footer>
  );
}
