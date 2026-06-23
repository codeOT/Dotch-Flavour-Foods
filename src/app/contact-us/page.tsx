import type { Metadata } from "next";
import { ContactContent } from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return <ContactContent />;
}
