import type { Metadata } from "next";
import { TestimonialGrid } from "@/components/pages/PagesContent";
import { getPublishedReviews } from "@/lib/feedback";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Testimonials",
};

export default async function TestimonialPage() {
  const reviews = await getPublishedReviews(24);
  return <TestimonialGrid reviews={reviews} />;
}
