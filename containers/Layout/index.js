"use client";

import { useRef, useState } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import styles from "./style.module.scss";
import LogoSm from "@/components/SVG/LogoSm";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const timeline = useRef(null);
  const menuItemsRef = useRef([]);

  useIsomorphicLayoutEffect(() => {
    if (!headerRef.current) return;
    const anim = gsap.to(headerRef.current, {
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      paused: true,
    });

    ScrollTrigger.create({
      trigger: "#hero-section",
      start: "100vh top",
      end: "+=1",
      onEnter: () => anim.play(),
      onLeaveBack: () => anim.reverse(),
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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

  const handleLinkClick = (href) => {
    timeline.current.reverse();
    document.body.style.overflow = "auto";
    setIsMenuOpen(false);

    setTimeout(() => {
      console.log("Navigate to:", href);
    }, 500);
  };

  return (
    <header
      className={`${styles.header} ${isMenuOpen ? styles.open : ""}`}
      ref={headerRef}
    >
      <div className={styles.logo}>
        <LogoSm />
      </div>

      <button
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
      </button>

      <nav className={styles.menu} ref={menuRef}>
        <a
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
        </a>
      </nav>
    </header>
  );
};

export default Header;
