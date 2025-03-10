"use client";
import { useState, useEffect } from "react";

import { ScrollTrigger, gsap } from "@/lib/gsapConfig";

// Default to desktop size during SSR to show desktop layouts initially
// This ensures server rendering matches initial client render
const DEFAULT_SSR_WIDTH = 1920;
const DEFAULT_SSR_HEIGHT = 1080;

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: DEFAULT_SSR_WIDTH,
    height: DEFAULT_SSR_HEIGHT,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      ScrollTrigger.refresh();
      gsap.to(window, { duration: 0.5, scrollTo: "top" });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
