import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/LegalContent";
import { accessibilityStatement } from "@/lib/legal";

export const metadata: Metadata = {
  title: accessibilityStatement.title,
  description: accessibilityStatement.description,
};

export default function AccessibilityPage() {
  return <LegalContent document={accessibilityStatement} />;
}
