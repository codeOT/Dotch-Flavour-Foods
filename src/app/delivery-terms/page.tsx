import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/LegalContent";
import { deliveryTerms } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Delivery Policy",
  description: deliveryTerms.description,
};

export default function DeliveryTermsPage() {
  return <LegalContent document={deliveryTerms} />;
}
