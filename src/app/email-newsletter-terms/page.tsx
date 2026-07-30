import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/LegalContent";
import { emailNewsletterTerms } from "@/lib/legal";

export const metadata: Metadata = {
  title: emailNewsletterTerms.title,
  description: emailNewsletterTerms.description,
};

export default function EmailNewsletterTermsPage() {
  return <LegalContent document={emailNewsletterTerms} />;
}
