import localFont from "next/font/local";

import { GENERAL_QUERY } from "@/sanity/lib/queries";
import Layout from "@/containers/Layout";
import { ModalProvider } from "@/context/ModalContext";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";

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
  const { contactEmail } = general[0];

  return (
    <html lang="en">
      <body className={`${greedNarrow.variable} ${greedStandard.variable}`}>
        <ModalProvider>
          <Layout contactEmail={contactEmail} />
          <main
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "100vw",
            }}
          >
            <div
              style={{
                position: "relative",
                zIndex: 1,
                background: "#f0f5ea",
                minHeight: "100vh",
                width: "100%",
                margin: "0 auto",
                overflowX: "clip",
              }}
            >
              {children}
            </div>
          </main>
          <Footer contactEmail={contactEmail} />
        </ModalProvider>
      </body>
    </html>
  );
}
