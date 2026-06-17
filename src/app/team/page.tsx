import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { TeamGrid } from "@/components/pages/PagesContent";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader title="Our Team" description="Meet the people behind every great meal." />
      <TeamGrid />
    </>
  );
}
