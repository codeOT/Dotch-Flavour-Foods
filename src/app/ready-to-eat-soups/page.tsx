import type { Metadata } from "next";
import { ReadySoupsPageContent } from "@/components/ready-soups/ReadySoupsPageContent";
import { readySoupsBrand } from "@/lib/ready-soups";

export const metadata: Metadata = {
  title: "Ready Soups | Premium Frozen Range",
  description: readySoupsBrand.intro,
};

export default function ReadyToEatSoupsPage() {
  return <ReadySoupsPageContent />;
}
