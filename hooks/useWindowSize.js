"use client";
import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: global?.window ? window.innerWidth : 100,
    height: global?.window ? window.innerHeight : 100,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (global?.window) {
      window.addEventListener("resize", handleResize);
      handleResize();
    }

    return () => {
      if (!global?.window) return;
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowSize;
};

export default useWindowSize;
