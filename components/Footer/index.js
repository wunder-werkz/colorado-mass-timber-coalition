"use client";
import { useRef, useEffect } from "react";
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
    },
    {
      icon: <LinkedIn />,
      url: "https://www.linkedin.com/company/colorado-mass-timber-coalition/",
    },
    {
      icon: <Instagram />,
      url: "https://www.instagram.com/coloradomass.timber/",
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.newsletter}>
          <NewsletterSignup />
        </div>
        <div className={styles.socials}>
          <div className={styles.stumpyWrap}>
            <Stumpy type="plank" color="orange" />
          </div>
          <div className={styles.socialWrap}>
            {SOCIAL_LINKS.map((link) => (
              <a href={link.url} key={link.url} className={styles.url}>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
       
      </div>
      <div className={styles.logo}>
        <FooterLogo />
      </div>
    </footer>
  );
}
