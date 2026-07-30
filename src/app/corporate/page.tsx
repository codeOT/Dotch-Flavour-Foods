import type { Metadata } from "next";
import { CorporateContent } from "@/components/pages/CorporateContent";

export const metadata: Metadata = {
  title: "Corporate Catering",
  description:
    "Corporate catering by Dotch Flavour — working lunches, meetings, and team celebrations with authentic Nigerian food.",
};

export default function CorporatePage() {
  return <CorporateContent />;
}
