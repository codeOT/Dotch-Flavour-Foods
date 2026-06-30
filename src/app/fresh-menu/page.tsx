import type { Metadata } from "next";
import { FreshMenuContent } from "@/components/pages/FreshMenuContent";

export const metadata: Metadata = {
  title: "Fresh Food Menu",
  description:
    "Browse the full Dotch Flavour fresh food menu. Order party jollof, fried rice, pepper fish, and more.",
};

export default function FreshMenuPage() {
  return <FreshMenuContent />;
}
