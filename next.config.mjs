/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { 
        loader: "default",
        domains: ["images.ctfassets.net", "downloads.ctfassets.net", "localhost", "cdn.sanity.io", "cdn.filestackcontent.com"], },
      i18n: {
        locales: ["en"],
        defaultLocale: "en",
      },
};

export default nextConfig;
