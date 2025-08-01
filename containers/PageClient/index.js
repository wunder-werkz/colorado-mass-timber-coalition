"use client";
import { useEffect } from "react";

import IntroSection from "@/components/IntroSection";
import ListSection from "@/components/ListSection";
import TakeActionBar from "@/components/TakeActionBar";

export default function PageClient({ introSection, pageSections }) {
    useEffect(() => {
        if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
        }
    }, []);

    const renderPageSections = () => {
        return pageSections.map((pageSection, i) => {
            if (pageSection._type == "listSection") {
                return <ListSection 
                key={`list-section-${i}`} listSection={pageSection} />
            } else if (pageSection._type == "ctaSection") {
                return <TakeActionBar 
                key={`take-action-section-${i}`} color={"orange"} headline={pageSection.headline} copy={pageSection.copy} links={pageSection.links} />
            }
        });
    }


    return (
        <>
        {introSection && <IntroSection introSection={introSection} />}
        {pageSections ? 
            renderPageSections()
        : ""}
        </>
    );


}
