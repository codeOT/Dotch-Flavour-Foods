import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/LegalContent";
import { storageHeatingGuide } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Storage and Heating Guide",
  description: storageHeatingGuide.description,
};

export default function StorageHeatingPage() {
  return <LegalContent document={storageHeatingGuide} />;
}
