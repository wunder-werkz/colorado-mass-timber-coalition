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

  // // Reset scroll position to top on page refresh
  // window.addEventListener("beforeunload", () => {
  //   window.scrollTo(0, 0);
  // });

  // // Ensure scroll position is at top when page loads
  // window.addEventListener("load", () => {
  //   window.scrollTo(0, 0);
  // });
}

export { gsap, ScrollTrigger, ScrollToPlugin, SplitText };
