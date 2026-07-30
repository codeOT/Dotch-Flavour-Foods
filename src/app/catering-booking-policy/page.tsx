import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/LegalContent";
import { cateringBookingPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: cateringBookingPolicy.title,
  description: cateringBookingPolicy.description,
};

export default function CateringBookingPolicyPage() {
  return <LegalContent document={cateringBookingPolicy} />;
}
