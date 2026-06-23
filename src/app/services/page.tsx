import type { Metadata } from "next";
import { ServicesGrid } from "@/components/pages/PagesContent";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return <ServicesGrid />;
}
