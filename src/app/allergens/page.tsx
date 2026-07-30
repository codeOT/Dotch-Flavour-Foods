import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/LegalContent";
import { allergensFoodSafety } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Allergens and Food Safety",
  description: allergensFoodSafety.description,
};

export default function AllergensPage() {
  return <LegalContent document={allergensFoodSafety} />;
}
