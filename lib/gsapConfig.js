import gsap from "gsap";
import ScrollTrigger from "@/lib/gsap/ScrollTrigger";
import ScrollToPlugin from "@/lib/gsap/ScrollToPlugin";
import SplitText from "@/lib/gsap/SplitText";

// Only run this code on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
  });
  // ScrollTrigger.normalizeScroll(true);
}

export { gsap, ScrollTrigger, ScrollToPlugin, SplitText };
