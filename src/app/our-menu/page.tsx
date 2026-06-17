import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { MenuGrid } from "@/components/pages/MenuContent";

export const metadata: Metadata = {
  title: "Our Menu",
};

export default function OurMenuPage() {
  return (
    <>
      <PageHeader
        title="Our Menu"
        description="Explore our curated selection of dishes made with fresh ingredients."
      />
      <MenuGrid />
    </>
  );
}
