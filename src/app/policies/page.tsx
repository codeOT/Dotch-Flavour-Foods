import type { Metadata } from "next";
import { PoliciesContent } from "@/components/pages/PoliciesContent";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Dotch Flavour Foods policies — terms, privacy, cookies, delivery, refunds, catering, allergens and more.",
  alternates: { canonical: "/policies" },
};

export default function PoliciesPage() {
  return <PoliciesContent />;
}
