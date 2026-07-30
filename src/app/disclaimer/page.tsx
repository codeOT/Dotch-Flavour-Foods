import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/LegalContent";
import { websiteProductDisclaimer } from "@/lib/legal";

export const metadata: Metadata = {
  title: websiteProductDisclaimer.title,
  description: websiteProductDisclaimer.description,
};

export default function DisclaimerPage() {
  return <LegalContent document={websiteProductDisclaimer} />;
}
