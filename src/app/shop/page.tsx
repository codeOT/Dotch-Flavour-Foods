import type { Metadata } from "next";
import { ShopGrid } from "@/components/pages/ShopContent";

export const metadata: Metadata = {
  title: "Shop",
};

export default function ShopPage() {
  return <ShopGrid />;
}
