"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import EyesSvg from "./EyesSvg";

const Eyeballs = ({ color = "black" }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!svgRef.current) return;

      const eyeballs = svgRef.current.getElementsByClassName("eyeball");
      const eyeballsArray = Array.from(eyeballs);

      const leftEyeRect = eyeballsArray[0].getBoundingClientRect();
      const rightEyeRect = eyeballsArray[1].getBoundingClientRect();
      const centerX = (leftEyeRect.left + rightEyeRect.right) / 2;
      const centerY = (leftEyeRect.top + rightEyeRect.bottom) / 2;

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      const maxRadius = 4;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(
        Math.sqrt(deltaX * deltaX + deltaY * deltaY),
        maxRadius
      );

      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;

      eyeballsArray.forEach((eyeball) => {
        gsap.to(eyeball, {
          x: moveX,
          y: moveY,
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
      <EyesSvg ref={svgRef} color={color} />
    </div>
  );
};

export default Eyeballs;
