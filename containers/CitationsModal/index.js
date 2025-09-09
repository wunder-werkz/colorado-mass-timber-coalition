"use client";

import { useEffect, useRef } from "react";
import { useModal } from "@/context/ModalContext";
import gsap from "gsap";
import styles from "./style.module.scss";

const CITATIONS = [
  {
    id: 1,
    text: "Colorado Forest Action Plan. Colorado State Forest Service (2020).",
    link: "https://csfs.colostate.edu/forest-action-plan/",
  },
  {
    id: 2,
    text: "Vorster, A. G. et al. Colorado Forest Carbon Inventory Orest Ecosystem and Harvested Wood Product Carbon Accounting Framework through 2019. (2024).",
    link: "https://csfs.colostate.edu/wp-content/uploads/2025/01/CSFS_CarbonAccountingReport_2024_FINAL_accessible.pdf",
  },
  {
    id: 3,
    text: "Domke, G. M. et al. Greenhouse gas emissions and removals from forest land, woodlands, urban trees, and harvested wood products in the United States, 1990-2021. Resour Bull WO-101 Wash. DC US Dep. Agric. For. Serv. Wash. Off. 101, (2023).",
    link: "https://www.fs.usda.gov/sites/default/files/fs_media/fs_document/GHG-Emissions-Removals.pdf",
  },
  {
    id: 4,
    text: "Somvichian-Clausen, A. The Important Relationship between Forests and Water. American Forests.",
    link: "https://www.americanforests.org/article/the-important-relationship-between-forests-and-water/",
  },
  {
    id: 5,
    text: "Watershed Protection & Management. Denver Water",
    link: "https://www.denverwater.org/your-water/water-supply-and-planning/watershed-protection-and-management.",
  },
  {
    id: 6,
    text: "Colorado Forest Fires, Climate Change and River Health. The Nature Conservancy",
    link: "https://www.nature.org/en-us/about-us/where-we-work/united-states/colorado/stories-in-colorado/forests-rivers-climate-change/",
  },
  {
    id: 7,
    text: "Warziniack, T., Sham, C., Morgan, R. & Feferholtz, Y. Effect of forest cover on water treatment costs. Water Econ. Policy 34 1750006 3, 1750006 (2017).",
    link: "https://research.fs.usda.gov/treesearch/55229",
  },
  {
    id: 8,
    text: "Davis, K. T. et al. Tamm review: A meta-analysis of thinning, prescribed fire, and wildfire effects on subsequent wildfire severity in conifer dominated forests of the Western US. For. Ecol. Manag. 561 121885 581, 121885 (2024).",
    link: "https://research.fs.usda.gov/treesearch/67659",
  },
  {
    id: 9,
    text: "Morgan, W. Wood is good. US Forest Service",
    link: "https://www.fs.usda.gov/about-agency/features/wood-good",
  },
  {
    id: 10,
    text: "Woolsey, G. A., Tinkham, W. T., Battaglia, M. A. & Hoffman, C. M. Constraints on mechanical fuel reduction treatments in United States Forest Service Wildfire Crisis Strategy priority landscapes. J. For. (2024)",
    link: "https://research.fs.usda.gov/treesearch/67835",
  },
  {
    id: 11,
    text: "Technology and Innovation Pathways for Zero-carbon-ready Buildings by 2030 – Analysis. IEA",
    link: "https://www.iea.org/reports/technology-and-innovation-pathways-for-zero-carbon-ready-buildings-by-2030",
  },
  {
    id: 12,
    text: "Why Mass Timber Makes Sense - and Saves Dollars. HKS Architects",
    link: "https://www.hksinc.com/our-news/articles/why-mass-timber-makes-sense/",
  },
  {
    id: 13,
    text: "A blueprint for creating hyperlocal mass timber ecosystems. World Economic Forum",
    link: "https://www.weforum.org/stories/2024/11/how-regional-mass-timber-markets-support-decarbonization-and-build-local-economies/",
  },
  {
    id: 14,
    text: "Bringing Embodied Carbon Upfront. World Green Building Council",
    link: "https://worldgbc.org/article/bringing-embodied-carbon-upfront/",
  },
  {
    id: 15,
    text: "Weir, M. Embodied Carbon 101: Building Materials. RMI",
    link: "https://rmi.org/embodied-carbon-101/",
  },
  {
    id: 16,
    text: "Voices, G. Speeding Up Construction With Mass Timber. Think Wood",
    link: "https://www.thinkwood.com/blog/projects-that-pencil-out-speed-up-construction-with-mass-timber",
  },
  {
    id: 17,
    text: "Brinson, S. Why mass timber is on the rise.",
    link: "https://axaxl.com/fast-fast-forward/articles/why-mass-timber-is-on-the-rise",
  },
  {
    id: 18,
    text: "Su, J. Large-scale fire tests of a mass timber building structure for MTDFTP - NRC Publications Archive.",
    link: "https://nrc-publications.canada.ca/eng/view/object/?id=38e02b27-e352-4189-bcfc-3e38fe1be12d",
  },
  {
    id: 19,
    text: "Browning, B., Ryan, C. & DeMarco, C. The Nature of Wood, An Exploration of the Science on Biophilic Responses to Wood.",
    link: "http://www.terrapinbrightgreen.com/report/the-nature-of-wood",
  },
  {
    id: 20,
    text: "Mass Timber in Affordable Multi-Family Housing. WoodWorks | Wood Products Council",
    link: "https://www.woodworks.org/resources/mass-timber-in-affordable-multi-family-housing/",
  },
];

export default function CitationsModal() {
  const { isOpen, closeModal } = useModal();
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      // Prevent body scroll
      document.querySelector("main").style.overflow = "hidden";

      // Animate modal in
      gsap.set(modalRef.current, { display: "block" });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.2 }
      );
    } else {
      // Animate modal out
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(modalRef.current, { display: "none" });
          document.querySelector("main").style.overflow = "unset";
        },
      });
    }
  }, [isOpen]);

  const midpoint = Math.ceil(CITATIONS.length / 2);
  const leftColumnCitations = CITATIONS.slice(0, midpoint);
  const rightColumnCitations = CITATIONS.slice(midpoint);

  return (
    <div ref={modalRef} className={styles.modal}>
      <div ref={contentRef} className={styles.content}>
        <button onClick={closeModal} className={styles.closeButton}>
          ×
        </button>
        <h2>Citations</h2>
        <div className={styles.columnsContainer}>
          <div className={styles.column}>
            {leftColumnCitations.map((citation) => (
              <div key={citation.id} className={styles.citation}>
                <span className={styles.number}>{citation.id}.</span>
                <a
                  href={citation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.text}>
                    {citation.text}
                    <br />
                  </span>
                  <span className={styles.link}>{citation.link}</span>
                </a>
              </div>
            ))}
          </div>
          <div className={styles.column}>
            {rightColumnCitations.map((citation) => (
              <div key={citation.id} className={styles.citation}>
                <span className={styles.number}>{citation.id}.</span>
                <a
                  href={citation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.text}>
                    {citation.text}
                    <br />
                  </span>
                  <span className={styles.link}>{citation.link}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
