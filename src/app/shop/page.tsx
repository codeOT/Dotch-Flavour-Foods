import type { Metadata } from "next";
import { ShopContent } from "@/components/pages/ShopContent";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop Ready Soups by Dotch Flavour online, and preview merchandise coming soon.",
};

export default function ShopPage() {
  return <ShopContent />;
}
