"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export default function ScrollSmoother({ children }) {
  const scrollRef = useRef();

  // useEffect(() => {
  //   scrollRef.current = new Lenis({
  //     duration: 1.4,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     direction: "vertical",
  //     gestureDirection: "vertical",
  //     smooth: true,
  //     smoothTouch: false,
  //     touchMultiplier: 2,
  //     infinite: false,
  //   });

  //   scrollRef.current.on("scroll", ScrollTrigger.update);

  //   const updateFunc = (time) => {
  //     scrollRef.current?.raf(time * 1000);
  //   };

  //   gsap.ticker.add(updateFunc, false, true);

  //   return () => {
  //     gsap.ticker.remove(updateFunc);
  //     scrollRef.current?.destroy();
  //   };
  // }, []);
  return <main>{children}</main>;
}
