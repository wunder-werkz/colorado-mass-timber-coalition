export const dynamic = "force-static";
export const metadata = {
  title: "Sanity Studio",
  description: "Sanity Studio for content management",
};

// Tell Next.js this is a root layout
export const segments = [];

export default function StudioLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
