import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://sold.financial"),

  title: "Sold — Helping homeowners manage money",
  description:
    "Sold helps homeowners understand, reduce, and manage the ongoing costs of owning property — from mortgages to rates, levies, and insurance.",

  openGraph: {
    title: "Sold — Helping homeowners manage money",
    description:
      "Understand, reduce, and manage the ongoing costs of owning property. Mortgages, rates, levies, and insurance — with clear, no-pressure guidance.",
    url: "https://sold.financial",
    siteName: "Sold",
    images: [
      {
        url: "/og_1200x630.png",
        width: 1200,
        height: 630,
        alt: "Sold — Helping homeowners manage money",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sold — Helping homeowners manage money",
    description:
      "Clear guidance for homeowners on mortgages, rates, levies, and other unavoidable property costs.",
    images: ["/og_1200x630.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ⭐ Facebook Pixel Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1765946257444245');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* ⭐ NoScript fallback for Pixel */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1765946257444245&ev=PageView&noscript=1"
          />
        </noscript>
      </head>

      <body className="bg-white text-neutral-900">
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>

        {/* ⭐ Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
