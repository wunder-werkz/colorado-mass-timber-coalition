import { client } from "@/sanity/lib/client";
 
const baseUrl = 'https://www.skylark.llc' || 'http://localhost:3000'

async function getData() {
  // Update query to get all content types that use [slug].js routes
  const query = `*[_type=="page"]{
    "currentSlug": slug.current,
    "updated": _updatedAt,
    "_type": _type
  }`
  const data = await client.fetch(query)
  return data
}

const data = await getData()
const staticPages = ['', '/about', '/work', '/contact', '/services'];

const cmsPages = data.map((item) => {

  return {
    url: `${baseUrl}/${item.currentSlug}`,
    lastmod: item.updated,
    changefreq: 'weekly',
    priority: 0.8,
  }
})

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


function generateSiteMap() {
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
 
export function GET() {

  const body = generateSiteMap();
 
  return new Response(body, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  });
}