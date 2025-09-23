"use client";
import { useEffect, useState } from "react";
import Partners from "../Partners";
import Maps from "../Maps";
import Button from "@/components/Button";

import s from "./style.module.scss";

export default function ResourcesPage({ content }) {
    const { resourcesPageSections} = content;
    const [activeFilter, setActiveFilter] = useState(resourcesPageSections ? resourcesPageSections[0].slug.current : null);

    useEffect(() => {
        if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
        }
    }, []);

    const renderPageSections = (filterSections) => {
        return filterSections.map((pageSection, i) => {
            if (pageSection._type == "partnersSection") {
                return   <Partners
                partners={pageSection.partners}
                partnersText={pageSection.copy}
                title={pageSection.headline}
                key={`page-seciton-${pageSection._id}`}
              />
            } else if (pageSection._type == "mapSection") {
                return  <Maps
                maps={pageSection.maps}
                mapsText={pageSection.copy}
                title={pageSection.headline}
                key={`page-seciton-${pageSection._id}`}
              />

            }
        });
    }



    return (
        <div className={s.resourcesPage}>
            <div className={s.title}>
                <h1> Resources </h1>
            </div>
            <div className={s.filtersContainer}>
                <div className={s.filterButtons}>
                    {resourcesPageSections && resourcesPageSections.map((section, i)=> {
                        const { filterSectionTitle, slug, _id} = section;
                    
                        return (                        <Button
                            key={`filter-button-${_id}`}
                            onClick={() => setActiveFilter(slug.current)}
                            variant="secondary"
                            color="orange"
                            fill={activeFilter == slug.current}
                        >
                            {filterSectionTitle}
                        </Button>
                        )
                    })}
                </div>   
            </div>
            <div className={s.resourceSections}>
                {resourcesPageSections ? 
                resourcesPageSections.map((section, i) => {
                    const { filterSections, slug, _id} = section;
               
                    return (
                        <div key={`filter-section-${_id}`} className={`${s.filterSection} ${slug.current == activeFilter ? s.active : s.hidden}`} >
                            {filterSections ? 
                                renderPageSections(filterSections)
                        : ""}
                        </div>
                    )
                })
                : ""}
            </div>
        </div>
    );


}
