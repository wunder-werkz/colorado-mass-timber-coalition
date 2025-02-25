import localFont from "next/font/local";
import ScrollSmoother from "@/containers/ScrollSmoother";
import Layout from "@/containers/Layout";
import { ModalProvider } from "@/context/ModalContext";
import Footer from "@/components/Footer";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${greedNarrow.variable} ${greedStandard.variable}`}>
        <ModalProvider>
          <Layout />
          <div
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                zIndex: 1,
                background: "#f0f5ea",
                minHeight: "100vh",
              }}
            >
              <ScrollSmoother>{children}</ScrollSmoother>
            </div>
          </div>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
