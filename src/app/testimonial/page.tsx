import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { TestimonialGrid } from "@/components/pages/PagesContent";

export const metadata: Metadata = {
  title: "Testimonials",
};

export default function TestimonialPage() {
  return (
    <>
      <PageHeader title="Testimonials" description="What our customers say about us." />
      <TestimonialGrid />
    </>
  );
}
