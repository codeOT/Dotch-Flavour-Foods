import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AboutContent } from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description="Learn more about Swigo and our passion for delivering fresh food experiences."
      />
      <AboutContent />
    </>
  );
}
