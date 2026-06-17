import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteShell } from "@/components/layout/SiteShell";

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

export const metadata: Metadata = {
  title: {
    default: "Dotch Flavours | West African Ready to Eat",
    template: "%s | Dotch Flavours",
  },
  description:
    "Authentic West African ready to eat meals — slow-cooked with care, ready in minutes. Explore our menu of Jollof, Egusi and more.",
  icons: {
    icon: "/assets/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${primaryFont.variable} ${secondaryFont.variable}`}
    >
      <body className={`${primaryFont.className} antialiased`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
