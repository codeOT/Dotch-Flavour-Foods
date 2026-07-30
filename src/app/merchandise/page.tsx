import type { Metadata } from "next";
import { MerchandiseContent } from "@/components/pages/MerchandiseContent";

export const metadata: Metadata = {
  title: "Merchandise — Coming Soon",
  description:
    "Dotch Flavour merchandise — tote bags, wooden spoons, and more — coming soon. Shop Ready Soups today.",
};

export default function MerchandisePage() {
  return <MerchandiseContent />;
}
