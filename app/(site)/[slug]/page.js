import { getPageSectionsQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

import PageClient from "@/containers/PageClient";

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

    if (page && page[0]) {
        return <PageClient introSection={page[0]?.introSection} pageSections={page[0]?.pageSections} />

    } else return;
   
}

export async function generateStaticParams() {
    // Fetch all possible slugs from your data source
    const pages = await client.fetch('*[_type=="page"]').then((res) => res);

    return pages.map((page) => ({
      slug: page.slug.current,
    }));
  }