"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import EyesSvg from "./EyesSvg";

const Eyeballs = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!svgRef.current) return;

      const eyeballs = svgRef.current.getElementsByClassName("eyeball");

      Array.from(eyeballs).forEach((eyeball) => {
        const eyeRect = eyeball.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        // Calculate angle between eye center and mouse position
        const angle = Math.atan2(
          event.clientY - eyeCenterY,
          event.clientX - eyeCenterX
        );

        // Convert radians to degrees and add 90 to align properly
        const rotation = (angle * 180) / Math.PI + 90;

        // Animate with GSAP
        gsap.to(eyeball, {
          rotation: rotation,
          transformOrigin: "center center",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <EyesSvg ref={svgRef} />
    </div>
  );
};

export default Eyeballs;
