import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Dotch Flavour — bringing the taste of home to every table. Founded in Nigeria in 2008 by Abi Olurin, now serving customers across the UK.",
};

export default function AboutPage() {
  return <AboutContent />;
}