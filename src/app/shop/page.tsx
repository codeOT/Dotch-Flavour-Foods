import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopGrid } from "@/components/pages/ShopContent";

export const metadata: Metadata = {
  title: "Shop",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader title="Shop" description="Order your favorite dishes online." />
      <ShopGrid />
    </>
  );
}
