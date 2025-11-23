import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "✨ Sold — Make Loans Easy",
  description:
    "Sold connects homeowners to better mortgage offers after analysing your mortgage via Open Banking.",
  openGraph: {
    title: "✨ Sold — Make Loans Easy",
    description:
      "Sold connects homeowners to better mortgage offers after analysing your mortgage via Open Banking.",
    url: "https://sold.financial",
    siteName: "Sold",
    images: [
      {
        url: "/og-image.png", // 👈 this must exist in /public
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
      "Sold connects homeowners to better mortgage offers after analysing your mortgage via Open Banking.",
    images: ["/og-image.png"] // 👈 same image used for Twitter
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
      </body>
    </html>
  );
}
