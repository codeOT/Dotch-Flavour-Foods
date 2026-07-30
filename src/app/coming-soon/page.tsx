import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Coming Soon",
};

export default function ComingSoonPage() {
  redirect("/merchandise");
}
