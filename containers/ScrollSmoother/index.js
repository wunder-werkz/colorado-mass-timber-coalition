"use client";

import { useEffect, useRef } from "react";
import { ScrollSmoother as GSAPScrollSmoother } from "@/lib/gsapConfig";

export default function ScrollSmoother({ children }) {
  const smoother = useRef(null);
  const wrapper = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    smoother.current = GSAPScrollSmoother.create({
      wrapper: wrapper.current,
      content: content.current,
      smooth: 1.5,
      effects: true,
    });

    // Store the instance globally
    window._smoothScroll = smoother.current;

    return () => {
      if (smoother.current) {
        smoother.current.kill();
        window._smoothScroll = null;
      }
    };
  }, []);

  return (
    <div ref={wrapper} id="smooth-wrapper">
      <div ref={content} id="smooth-content">
        {children}
      </div>
    </div>
  );
}
