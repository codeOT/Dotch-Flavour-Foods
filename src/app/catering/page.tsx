import type { Metadata } from "next";
import { CateringContent } from "@/components/pages/CateringContent";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Catering by Dotch Flavour — authentic Nigerian food for private celebrations, office lunches, and brand experiences.",
};

export default function CateringPage() {
  return <CateringContent />;
}
