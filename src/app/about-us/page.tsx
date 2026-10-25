import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/AboutContent";

import { absoluteTitle } from "@/lib/seo";

const aboutTitle = "About Dotch Flavour Foods | Authentic Home-Cooked Nigerian Food";
const aboutDescription =
  "Discover Dotch Flavour Foods. Founded by Abi to bring authentic, high-quality, ready-to-eat Nigerian home cooking, soups & meal trays to London & the UK.";

export const metadata: Metadata = {
  title: absoluteTitle(aboutTitle),
  description: aboutDescription,
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: aboutTitle,
    description: aboutDescription,
    url: "/about-us",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}