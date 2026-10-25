import type { Metadata } from "next";
import { FreshMenuContent } from "@/components/pages/FreshMenuContent";

import { absoluteTitle } from "@/lib/seo";

const freshMenuTitle = "Bulk Nigerian Food Trays Delivery UK (2L–6L) | Dotch Flavour";
const freshMenuDescription =
  "Order fresh bulk Nigerian food trays in 2L–6L sizes across the UK. Smoky Jollof rice, Buka stew, Ayamase & Abula combo trays for meal prep and events.";

export const metadata: Metadata = {
  title: absoluteTitle(freshMenuTitle),
  description: freshMenuDescription,
  alternates: { canonical: "/fresh-menu" },
  openGraph: {
    title: freshMenuTitle,
    description: freshMenuDescription,
    url: "/fresh-menu",
  },
};

export default function FreshMenuPage() {
  return <FreshMenuContent />;
}
