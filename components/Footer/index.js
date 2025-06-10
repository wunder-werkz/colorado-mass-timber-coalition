"use client";
import FooterLogo from "../SVG/FooterLogo";

import NewsletterSignup from "@/components/NewsletterSignup";
import styles from "./style.module.scss";

import Stumpy from "@/components/Stumpy";

import { Email, LinkedIn, Instagram } from "@/components/SVG/Social";

export default function Footer({ footer }) {
  const { instaLink, email, linkedInUrl, emailSignupHeadline, emailSignupCopy, emailSignupLink} = footer[0];

  const SOCIAL_LINKS = [
    {
      icon: <Email />,
      url: `mailto:${email}`,
      ariaLabel: "Email",
    },
    {
      icon: <LinkedIn />,
      url: `${linkedInUrl}`,
      ariaLabel: "Linked In",
    },
    {
      icon: <Instagram />,
      url: `${instaLink}`,
      ariaLabel: "Instagram",
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.newsletter}>
          <NewsletterSignup headline={emailSignupHeadline} copy={emailSignupCopy} emailLink={emailSignupLink}/>
        </div>

        <div className={styles.socials}>
          <div className={styles.stumpyWrap}>
            <Stumpy type="plank" color="orangeOrange" />
          </div>

          <div className={styles.socialWrap}>
            {SOCIAL_LINKS.map((link, index) => (
              <a
                key={link.url}
                href={link.url}
                className={`${styles.url} no-line`}
                aria-label={link.ariaLabel}
                title={link.ariaLabel}
              >
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
