import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site";
import { getSiteUrl } from "@/lib/sitemap-data";
import { defaultSeo, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const primaryFont = localFont({
  src: "./fonts/lalogrotesktrial-regular.otf",
  variable: "--font-primary",
  display: "swap",
});

const secondaryFont = localFont({
  src: "./fonts/CreatoDisplay-Regular.otf",
  variable: "--font-secondary",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultSeo.title,
    template: "%s | Dotch Flavour Foods",
  },
  description: defaultSeo.description,
  keywords: [...defaultSeo.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "food",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: siteConfig.name,
    title: defaultSeo.title,
    description: defaultSeo.description,
    images: [
      {
        url: defaultSeo.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — authentic Nigerian Ready Soups`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeo.title,
    description: defaultSeo.description,
    images: [defaultSeo.ogImage],
  },
  icons: {
    icon: "/assets/images/favicon.png",
    apple: "/assets/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${primaryFont.variable} ${secondaryFont.variable}`}>
      <body className={`${primaryFont.className} antialiased`}>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
