"use client";
import { useEffect, useState } from "react";
import Partners from "../Partners";
import Button from "@/components/Button";

import s from "./style.module.scss";

export default function ResourcesPage({ resourcePage }) {
    const { resourcePageSections} = resourcePage;
    const [activeFilter, setActiveFilter] = useState(resourcePageSections[0].slug);

    useEffect(() => {
        if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
        }
    }, []);

    const renderPageSections = (pageSections) => {
        return pageSections.map((pageSection, i) => {
            if (pageSection._type == "partnersSection") {
                return   <Partners
                partners={pageSection.partners}
                partnersText={pageSection.copy}
                title={pageSection.headline}
              />
            } else if (pageSection._type == "mapSection") {
                return <div> Map Section </div>
            }
        });
    }


    return (
        <>
        <div className={s.filtersContainer}>
            <div className={filterButtons}>
                {resourcePageSections.map((section, i)=> {
                    const { filterSectionTitle, slug, _id} = section;
                
                    return (                        <Button
                        key={`filter-button-${_id}`}
                        onClick={() => setActiveFilter(slug)}
                        variant="secondary"
                        color="orange"
                        fill={activeFilter == slug}
                    >
                        {filterSectionTitle}
                    </Button>
                    )
                })}
            
            </div>
            
        </div>
        {resourcePageSections ? 
           resourcesPageSections.map((section, i) => {
            const {introSection, filterSections, slug, _id} = section;
            return (
                <div className={`${s.filterSection} ${slug == activeFilter ? s.active : s.hidden}`} >
                    {introSection && <IntroSection introSection={introSection} />}
                    {filterSections ? 
                        renderPageSections(filterSections)
                : ""}
                </div>
            )
           })
        : ""}
        </>
    );


}
