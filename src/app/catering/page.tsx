import type { Metadata } from "next";
import { CateringContent } from "@/components/pages/CateringContent";

import { absoluteTitle } from "@/lib/seo";

const cateringTitle = "Best Nigerian Food Catering in London | Dotch Flavour Foods";
const cateringDescription =
  "Authentic Nigerian event catering in London. Private parties, weddings & corporate events. Book Jollof, Ofada, Moi Moi & soup party trays today!";

export const metadata: Metadata = {
  title: absoluteTitle(cateringTitle),
  description: cateringDescription,
  alternates: { canonical: "/catering" },
  openGraph: {
    title: cateringTitle,
    description: cateringDescription,
    url: "/catering",
  },
};

export default function CateringPage() {
  return <CateringContent />;
}
