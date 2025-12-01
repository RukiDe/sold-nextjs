import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ⭐ Add Analytics import
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://sold.financial"),
  title: "✨ Sold — Make Loans Easy",
  description:
    "Sold connects homeowners to mortgage offers after analysing your mortgage via Open Banking.",
  openGraph: {
    title: "✨ Sold — Make Loans Easy",
    description:
      "Sold connects homeowners to mortgage offers after analysing your mortgage via Open Banking.",
    url: "https://sold.financial",
    siteName: "Sold",
    images: [
      {
        url: "/og_1200x630.png",
        width: 1200,
        height: 630,
        alt: "Sold — Make Loans Easy"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "✨ Sold — Make Loans Easy",
    description:
      "Sold connects homeowners to mortgage offers after analysing your mortgage via Open Banking.",
    images: ["/og_1200x630.png"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900">
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>

        {/* ⭐ Vercel Analytics component */}
        <Analytics />
      </body>
    </html>
  );
}
