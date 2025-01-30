import gsap from "gsap";
import ScrollTrigger from "@/lib/gsap/ScrollTrigger";
import ScrollSmoother from "@/lib/gsap/ScrollSmoother";
import ScrollToPlugin from "@/lib/gsap/ScrollToPlugin";
import SplitText from "@/lib/gsap/SplitText";

// Only run this code on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin, SplitText);

  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
  });
}

export { gsap, ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText };
