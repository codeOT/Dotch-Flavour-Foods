import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Dotch Flavours Foods — authentic African flavours, founded by Mrs Abimbola Olurin.",
};

export default function AboutPage() {
  return <AboutContent />;
}
