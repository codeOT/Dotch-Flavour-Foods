import type { Metadata } from "next";
import { MenuGrid } from "@/components/pages/MenuContent";

import { absoluteTitle } from "@/lib/seo";

const mealsTitle = "Nigerian Meals & Sides | Smoky Jollof, Ofada Rice, Moi Moi UK";
const mealsDescription =
  "Order authentic Nigerian rice & meal options online: Smoky Jollof, Ofada Rice, Rice & Stew, Yam Porridge, Beans Porridge, Moi Moi, Beef, Chicken & Fried Plantain.";

export const metadata: Metadata = {
  title: absoluteTitle(mealsTitle),
  description: mealsDescription,
  alternates: { canonical: "/our-menu" },
  openGraph: {
    title: mealsTitle,
    description: mealsDescription,
    url: "/our-menu",
  },
};

export default function OurMenuPage() {
  return <MenuGrid />;
}
