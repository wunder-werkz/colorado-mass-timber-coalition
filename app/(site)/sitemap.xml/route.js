import { sanityFetch } from "@/sanity/lib/fetch";

const baseUrl = 'https://www.colorado-mass-timber-coalition.com'

async function getData() {
  // Update query to get all content types that use [slug].js routes
  const query = `*[_type=="page"]{
    "currentSlug": slug.current,
    "updated": _updatedAt,
    "_type": _type
  }`
  const data = await sanityFetch(query, {}, ["page"])
  return data
}

const staticPages = ['', '/about', '/events', '/action', '/resources'];

const staticRoutes = staticPages.map((page) => {
  let priority = 0.7
  if (page === '') priority = 1
  if (page === '/events') priority = 0.9
  if (page === '/action') priority = 0.9
  if (page === '/about') priority = 0.8
  if (page === '/resources') priority = 0.8

  return {
    url: `${baseUrl}${page}`,
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority,
  }
})


function generateSiteMap(cmsPages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${[...staticRoutes, ...cmsPages]
        .map(({ url, lastmod, changefreq, priority }) => {
          return `
            <url>
              <loc>${url}</loc>
              ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
              ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
              ${priority ? `<priority>${priority}</priority>` : ''}
            </url>
          `
        })
        .join('')}
   </urlset>
 `;
}
 
export async function GET() {
  const data = await getData()

  const cmsPages = data.map((item) => ({
    url: `${baseUrl}/${item.currentSlug}`,
    lastmod: item.updated,
    changefreq: 'weekly',
    priority: 0.8,
  }))

  const body = generateSiteMap(cmsPages);
 
  return new Response(body, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  });
}