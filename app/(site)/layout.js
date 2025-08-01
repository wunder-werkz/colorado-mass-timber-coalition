import localFont from "next/font/local";

import { GENERAL_QUERY, UPCOMING_EVENTS_QUERY, FOOTER_QUERY, NAVIGATION_QUERY, MODAL_QUERY } from "@/sanity/lib/queries";
import Layout from "@/containers/Layout";
import { ModalProvider } from "@/context/ModalContext";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import Head from "next/head";
import faviconIco from "../../public/favicon/favicon.ico";
import favicon from "../../public/favicon/favicon.svg";
import favicon96 from "../../public/favicon/favicon-96x96.png";
import manifest from "../../public/static/webmanifest.json";
import SmoothScroll from "@/components/SmoothScroll";
import MarketingModal from "@/components/MarketingModal";

import "@/styles/global.scss";

const greedNarrow = localFont({
  src: "./fonts/GreedNarrow-Regular.woff2",
  variable: "--font-greed-narrow",
});

const greedStandard = localFont({
  src: "./fonts/GreedStandard-Regular.woff2",
  variable: "--font-greed-standard",
});

export const metadata = {
  title: "Colorado Mass Timber Coalition",
  description: "Colorado Mass Timber Coalition",
};

export default async function RootLayout({ children }) {
  const general = await client.fetch(GENERAL_QUERY);
  const events = await client.fetch(UPCOMING_EVENTS_QUERY);
  const footer = await client.fetch(FOOTER_QUERY);
  const navigation = await client.fetch(NAVIGATION_QUERY);
  const modal = await client.fetch(MODAL_QUERY);

  console.log(modal);
  return (
    <html lang="en">
      <Head>
        <title>Colorado Mass Timber Coalition</title>
        <meta
          name="description"
          content="Supporting healthy, resilient forests through a vibrant forest-products economy including mass timber in the Rocky Mountain Region"
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:title" content="Colorado Mass Timber Coalition" />
        <meta
          property="og:site_name"
          content="Colorado Mass Timber Coalition"
        />
        <meta
          property="og:description"
          content="Colorado Mass Timber Coalition supports healthy, resilient forests through a vibrant forest-products
          economy including mass timber throughout the Rocky Moutain Region"
        />
        <meta
          property="og:url"
          content="https://www.colorado-mass-timber-coalition.com/"
        />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, viewport-fit=cover"
        />
        <link rel="icon" type="image/png" href={favicon96.src} sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href={favicon.src} />
        <link rel="shortcut icon" href={faviconIco.src} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="CMTC" />
        <link rel="manifest" href={manifest.src} />
      </Head>
      <body className={`${greedNarrow.variable} ${greedStandard.variable}`}>
        {modal && modal[0].isVisible && (
          <MarketingModal
            modal={modal}/>
        )}
        <SmoothScroll>
          <ModalProvider>
            <Layout
              navigation={navigation}
              contactEmail={footer[0].email}
              hasEvents={events && events.length > 0}
            />
            <main>
              {children}
              <Footer footer={footer} />
            </main>
          </ModalProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
