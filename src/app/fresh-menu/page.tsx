import type { Metadata } from "next";
import { FreshMenuContent } from "@/components/pages/FreshMenuContent";

export const metadata: Metadata = {
  title: "Fresh Food Menu",
  description:
    "Browse the official Dotch Flavour fresh food menu — stews, soups, protein sides, and traditional dishes in 2L, 4L, and 6L trays.",
};

export default function FreshMenuPage() {
  return <FreshMenuContent />;
}
