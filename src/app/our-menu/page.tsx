import type { Metadata } from "next";
import { MenuGrid } from "@/components/pages/MenuContent";

export const metadata: Metadata = {
  title: "Our Menu",
};

export default function OurMenuPage() {
  return <MenuGrid />;
}
