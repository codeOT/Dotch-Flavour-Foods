import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/LegalContent";
import { privacyPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacyPolicy.description,
};

export default function PrivacyPolicyPage() {
  return <LegalContent document={privacyPolicy} />;
}
