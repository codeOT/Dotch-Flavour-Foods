import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SoupsGrid } from "@/components/pages/SoupsContent";

export const metadata: Metadata = {
  title: "Ready to Eat Soups",
};

export default function ReadyToEatSoupsPage() {
  return (
    <>
      <PageHeader
        title="Ready to Eat Soups"
        description="Authentic Nigerian soups, prepared fresh and ready to heat, serve, and enjoy."
      />
      <SoupsGrid />
    </>
  );
}
