import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/LegalContent";
import { cookiePolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: cookiePolicy.description,
};

export default function CookiePolicyPage() {
  return <LegalContent document={cookiePolicy} />;
}
