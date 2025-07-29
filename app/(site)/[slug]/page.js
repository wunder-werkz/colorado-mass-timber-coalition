import { getPageSectionsQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import IntroSection from "@/components/IntroSection";
import ListSection from "@/components/ListSection";
import TakeActionBar from "@/components/TakeActionBar";

export default async function Page({ params}) {
    const { slug } = await params;
    const page = await client.fetch(`*[_type=="page" && slug.current == "${slug}"]{
        pageTitle,
        slug,
        pageMetadata,
        introSection->{
            headline,
            image{
                image{
                    asset->,
                    alt,
                    hotspot,
                    crop
                }
            },
            "imageUrl": image.image.asset->url,
            "imageHeight": image.image.asset->metadata.dimensions.height,
            "imageWidth": image.image.asset->metadata.dimensions.width,
            copy,
            links[]->{
                linkTitle,
                url,
                newWindow,
                downloadPdf,
                description,
                "downloadUrl": downloadPdf.asset->url,
            },
        },
        pageSections[]->{
            ${getPageSectionsQuery()}
        }
    }`
    );

    const renderPageSections = () => {
        return page[0].pageSections.map((pageSection, i) => {
            if (pageSection._type == "listSection") {
                return <ListSection 
                key={`list-section-${i}`} listSection={pageSection} />
            } else if (pageSection._type == "ctaSection") {
                return <TakeActionBar color={"orange"} headline={pageSection.headline} copy={pageSection.copy} links={pageSection.links} />
            }
        });
    }


    if (page && page[0]) {
        return (
            <>
            {page[0]?.introSection && <IntroSection introSection={page[0].introSection} />}
            {page[0]?.pageSections ? 
                renderPageSections()
            : ""}
            </>
        );
    } else return;
   
}

export async function generateStaticParams() {
    // Fetch all possible slugs from your data source
    const pages = await client.fetch('*[_type=="page"]').then((res) => res);

    return pages.map((page) => ({
      slug: page.slug.current,
    }));
  }