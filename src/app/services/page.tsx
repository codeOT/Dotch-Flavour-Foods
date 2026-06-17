import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesGrid } from "@/components/pages/PagesContent";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Services" description="Everything we offer to make your dining experience great." />
      <ServicesGrid />
    </>
  );
}
