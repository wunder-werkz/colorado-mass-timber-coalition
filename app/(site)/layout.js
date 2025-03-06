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
  const { contactEmail } = general ? general[0] : {contactEmail: "wlepry@nationalforests.org"} ;

  return (
    <html lang="en">
      <body className={`${greedNarrow.variable} ${greedStandard.variable}`}>
        <ModalProvider>
          <Layout contactEmail={contactEmail} />
          <main>
            {children}
            <Footer contactEmail={contactEmail} />
          </main>
        </ModalProvider>
      </body>
    </html>
  );
}
