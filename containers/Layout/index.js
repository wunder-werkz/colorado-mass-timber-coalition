"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import styles from "./style.module.scss";
import LogoSm from "@/components/SVG/LogoSm";
import { usePathname, useRouter } from "next/navigation";

import Stumpy from "@/components/Stumpy";
import Button from "@/components/Button";
import SplitTextBg from "@/components/SplitTextBg";
import { LinkedIn, Instagram } from "@/components/SVG/Social";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const timeline = useRef(null);
  const menuItemsRef = useRef([]);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/" || pathname === "/home";

  useIsomorphicLayoutEffect(() => {
    if (!headerRef.current) return;

    const anim = gsap.to(headerRef.current, {
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
        onEnter: () => anim.play(),
        onLeaveBack: () => anim.reverse(),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isHomePage]);

  const toggleMenu = () => {
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
    } else {
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
    <header
      className={`${styles.header} ${isMenuOpen ? styles.open : ""}`}
      ref={headerRef}
    >
      <div className={styles.logo}>
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
          <div className={styles.titleWrap}>What Can I Help You With?</div>
          <div className={styles.stumpWrap}>
            <Stumpy color="cream" type="stump" />
          </div>
        </div>
        <div
          className={styles.buttonWrap}
          ref={(el) => (menuItemsRef.current[1] = el)}
        >
          <Button
            variant="primary"
            color="forest"
            onClick={() => handleLinkClick("/events")}
          >
            Events
          </Button>
          <Button
            variant="primary"
            color="forest"
            onClick={() => handleLinkClick("mailto:info@stumpy.com", true)}
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
      {/* <a
          className={styles.menuItem}
          onClick={() => handleLinkClick("/home")}
          ref={(el) => (menuItemsRef.current[0] = el)}
        >
          Home
        </a>
        <a
          className={styles.menuItem}
          onClick={() => handleLinkClick("/about")}
          ref={(el) => (menuItemsRef.current[1] = el)}
        >
          About
        </a>
        <a
          className={styles.menuItem}
          onClick={() => handleLinkClick("/contact")}
          ref={(el) => (menuItemsRef.current[2] = el)}
        >
          Contact
        </a> */}
      {/* </nav> */}
    </header>
  );
};

export default Header;
