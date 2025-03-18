"use client";

import * as ST from "@bsmnt/scrollytelling";
import { useEffect } from "react";

export default function ScrollReset() {
  const scrollToLabel = ST.useScrollToLabel(`resizeReset`);

  useEffect(() => {
    const handleResize = () => {
      scrollToLabel();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollToLabel]);

  return <ST.Waypoint at={0} label={`resizeReset`} />;
}
