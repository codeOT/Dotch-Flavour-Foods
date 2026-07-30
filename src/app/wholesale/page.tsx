import type { Metadata } from "next";
import { WholesaleContent } from "@/components/pages/WholesaleContent";

export const metadata: Metadata = {
  title: "Wholesale & Stockists",
  description:
    "Enquire about wholesale and stockist opportunities for Ready Soups by Dotch Flavour.",
};

export default function WholesalePage() {
  return <WholesaleContent />;
}
