"use client";
import { useRef } from "react";
import * as ST from "@bsmnt/scrollytelling";
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

  return (
    <ST.Root start="top 80%" end="bottom bottom">
      <footer className={styles.footer}>
        <div className={styles.content}>
          <ST.Animation
            tween={{
              start: 0,
              end: 10,
              fromTo: [
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0 },
              ],
              duration: 0.6,
              ease: "power2.out",
            }}
          >
            <div className={styles.newsletter}>
              <NewsletterSignup />
            </div>
          </ST.Animation>

          <div className={styles.socials}>
            <ST.Animation
              tween={{
                start: 20,
                end: 30,
                fromTo: [
                  { opacity: 0, scale: 0.8 },
                  { opacity: 1, scale: 1 },
                ],
                duration: 0.4,
                ease: "back.out(1.7)",
              }}
            >
              <div className={styles.stumpyWrap}>
                <Stumpy type="plank" color="orange" />
              </div>
            </ST.Animation>

            <div className={styles.socialWrap}>
              {SOCIAL_LINKS.map((link, index) => (
                <ST.Animation
                  key={link.url}
                  tween={{
                    start: 30 + index * 0.2,
                    end: 40 + index * 0.2 + 0.1,
                    fromTo: [
                      { opacity: 0, y: 20 },
                      { opacity: 1, y: 0 },
                    ],
                    ease: "power2.out",
                  }}
                >
                  <a
                    href={link.url}
                    className={styles.url}
                    aria-label={link.ariaLabel}
                    title={link.ariaLabel}
                  >
                    {link.icon}
                  </a>
                </ST.Animation>
              ))}
            </div>
          </div>
        </div>

        <ST.Animation
          tween={{
            start: 80,
            end: 90,
            fromTo: [
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0 },
            ],
            ease: "power2.out",
          }}
        >
          <div className={styles.logo}>
            <FooterLogo />
          </div>
        </ST.Animation>
      </footer>
    </ST.Root>
  );
}
