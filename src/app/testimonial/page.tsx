import type { Metadata } from "next";
import { TestimonialGrid } from "@/components/pages/PagesContent";

export const metadata: Metadata = {
  title: "Testimonials",
};

export default function TestimonialPage() {
  return <TestimonialGrid />;
}
