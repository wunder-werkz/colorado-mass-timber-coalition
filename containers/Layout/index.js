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

const Header = ({ contactEmail, hasEvents,navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const timeline = useRef(null);
  const menuItemsRef = useRef([]);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/about";

  useEffect(() => {
    if (!logoRef.current) return;

    const logoAnim = gsap.to(logoRef.current, {
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    });

    if (isHomePage) {
      ScrollTrigger.create({
        trigger: "#hero-section",
        start: "top+=180% top",
        end: "+=1",
        onEnter: () => logoAnim.play(),
        onLeaveBack: () => logoAnim.reverse(),
      });
    } else {
      gsap.to(logoRef.current, {
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        paused: isHomePage,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isHomePage]);

  const toggleMenu = () => {
    const body = document.querySelector("main");;
    if (!timeline.current) {
      timeline.current = gsap
        .timeline({ paused: true })
        .to(menuRef.current, {
          height: "100%",
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
      timeline.current.play();
      body.style.overflow = "hidden";
      body.style.height = "100%";
    } else {
      body.style.overflow = "unset";
      body.style.height = "auto";
      timeline.current.reverse();
    }

    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (href, isExternal = false) => {
    timeline.current.reverse();
    setIsMenuOpen(false);
    const body = document.querySelector("main");
    body.style.overflow = "unset";
    body.style.height = "auto";
    ScrollTrigger.refresh();

    setTimeout(() => {
      if (isExternal) {
        window.open(href, "_blank");
      } else {
        router.push(href);
      }
    }, 100);
  };

  const SOCIAL_LINKS = [
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
    <header className={`${styles.header} ${isMenuOpen ? styles.open : ""}`}>
      <div className={styles.logo} ref={logoRef}>
        <Link
          aria-label="Home"
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
      <div className={styles.mobileNav}>
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          aria-label="hamburger menu"
        >
          <span></span>
        </button>
      </div>
      {/* <nav className={styles.mainNav}>
        <ul>
          <li> 
            <Button
                href={"/about"}
                variant="secondary"
                large={false}
                color={"orange"}
                fill={false}
              >
              Our Story
            </Button>
          </li>
          <li>
            <Button
                href="/events"
                variant="secondary"
                color="orange"
                large={false}
                fill={false}
              >
                Events
            </Button>
          </li>
          <li>
            <Button
                href="/action"
                variant="secondary"
                color="orange"
                large={false}
                fill={false}
              >
                Take Action
            </Button>
          </li>
          <li>
            <Button
                href="mailto:wlepry@nationalforests.org"
                variant="secondary"
                color="orange"
                large={false}
                fill={false}
              >
                contact
            </Button>
          </li>
        </ul>
      </nav> */}
      <nav className={`${styles.menu} ${styles.mobileNav}`} ref={menuRef}>
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
                onClick={() => handleLinkClick(`/about`, false)}
                variant="primary"
                color="forest"
                large={true}
              >
              Our Story
            </Button>
          {hasEvents && (
            <Button
              variant="primary"
              color="forest"
              onClick={() => handleLinkClick(`/events`, false)}
              large={true}
            >
              Events
            </Button>
          )}
          <Button
                onClick={() => handleLinkClick(`/action`, false)}
              variant="primary"
              color="forest"
              large={true}
            >
              Take Action
          </Button>
          <Button
                onClick={() => handleLinkClick(`/resources`, false)}
              variant="primary"
              color="forest"
              large={true}
            >
              Resources
          </Button>
          {navigation && navigation[0] && navigation[0].navItems.length > 0 && navigation[0].navItems.map((navItem, i) => {
            if (navItem._type == "page" && navItem.slug) {
              return (<Button
                key={`nav-item-${i}`}
                variant="primary"
                color="forest"
                onClick={() => handleLinkClick(`/${navItem.slug.current}`, false)}
                large={true}
              >
                {navItem.pageTitle || navItem.slug.current}
              </Button> )
            } else {
              return (<Button
                key={`nav-item-${i}`}
                href={navItem.url}
                newWindow={navItem.newWindow}
                downloadPdf={navItem.downloadPdf}
                downloadUrl={navItem.downloadUrl}
                variant="primary"
                color="forest"
                large={true}
              >
                {navItem.linkTitle ? navItem.linkTitle : "Learn More"}
              </Button>
              )
            }
          })}
          {/* <Button
            variant="primary"
            color="forest"
            onClick={() => handleLinkClick(`mailto:${contactEmail}`, true)}
            large={true}
          >
            Contact
          </Button> */}
          <div
            className={styles.socialWrap}
            ref={(el) => (menuItemsRef.current[2] = el)}
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                href={link.url}
                key={link.url}
                className={styles.url}
                aria-label={link.ariaLabel}
                title={link.ariaLabel}
              >
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
