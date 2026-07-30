import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/LegalContent";
import { websiteTerms } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Website Terms and Conditions",
  description: websiteTerms.description,
};

export default function WebsiteTermsPage() {
  return <LegalContent document={websiteTerms} />;
}
