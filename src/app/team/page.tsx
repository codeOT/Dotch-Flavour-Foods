import type { Metadata } from "next";
import { TeamGrid } from "@/components/pages/PagesContent";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamPage() {
  return <TeamGrid />;
}
