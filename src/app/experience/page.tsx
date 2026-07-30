import type { Metadata } from "next";
import { ExperienceContent } from "@/components/pages/ExperienceContent";

export const metadata: Metadata = {
  title: "Dotch Flavour Experience",
  description:
    "Taste, story, and community — register for the Dotch Flavour Experience and upcoming food tastings.",
};

export default function ExperiencePage() {
  return <ExperienceContent />;
}
