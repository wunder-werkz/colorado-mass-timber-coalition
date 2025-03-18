"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import styles from "./style.module.scss";
import LogoSm from "@/components/SVG/LogoSm";
import { usePathname, useRouter } from "next/navigation";
import Stumpy from "@/components/Stumpy";
import Button from "@/components/Button";
import { LinkedIn, Instagram } from "@/components/SVG/Social";

const Header = ({ contactEmail }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const timeline = useRef(null);
  const menuItemsRef = useRef([]);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/" || pathname === "/home";

  useEffect(() => {
    if (!logoRef.current) return;

    const logoAnim = gsap.to(logoRef.current, {
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      paused: isHomePage,
    });

    if (isHomePage) {
      ScrollTrigger.create({
        trigger: "#hero-section",
        start: "top+=180% top",
        end: "+=1",
        onEnter: () => logoAnim.play(),
        onLeaveBack: () => logoAnim.reverse(),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isHomePage]);

  const toggleMenu = () => {
    const body = document.body;
    if (!timeline.current) {
      timeline.current = gsap
        .timeline({ paused: true })
        .to(menuRef.current, {
          height: "100vh",
          duration: 0.5,
          ease: "power2.inOut",
        })
        .from(menuItemsRef.current, {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.3,
        });
    }

    if (!isMenuOpen) {
      window._smoothScroll?.paused(true);
      timeline.current.play();
      body.style.overflow = "hidden";
      body.style.height = "100%";
    } else {
      body.style.overflow = "unset";
      body.style.height = "auto";
      window._smoothScroll?.paused(false);
      timeline.current.reverse();
    }

    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (href, isExternal = false) => {
    timeline.current.reverse();
    window._smoothScroll?.paused(false);
    setIsMenuOpen(false);

    setTimeout(() => {
      if (isExternal) {
        window.open(href, "_blank");
      } else {
        router.push(href);
      }
    }, 500);
  };

  const SOCIAL_LINKS = [
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
    <header className={`${styles.header} ${isMenuOpen ? styles.open : ""}`}>
      <div className={styles.logo} ref={logoRef}>
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            if (pathname !== "/") {
              window.location.href = "/";
            }
          }}
        >
          <LogoSm />
        </Link>
      </div>

      <button
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
      </button>

      <nav className={styles.menu} ref={menuRef}>
        <div
          className={styles.stumpyWrap}
          ref={(el) => (menuItemsRef.current[0] = el)}
        >
          <div className={styles.titleWrap}>What can I help you find?</div>
          <div className={styles.stumpWrap}>
            <Stumpy color="cream" type="treeEyes" />
          </div>
        </div>
        <div
          className={styles.buttonWrap}
          ref={(el) => (menuItemsRef.current[1] = el)}
        >
          <Button
            variant="primary"
            color="forest"
            className="large"
            onClick={() => handleLinkClick("/events")}
          >
            Events
          </Button>
          <Button
            variant="primary"
            color="forest"
            className="large"
            onClick={() => handleLinkClick(`mailto:${contactEmail}`, true)}
          >
            Contact
          </Button>
          <div
            className={styles.socialWrap}
            ref={(el) => (menuItemsRef.current[2] = el)}
          >
            {SOCIAL_LINKS.map((link) => (
              <a href={link.url} key={link.url} className={styles.url}>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
