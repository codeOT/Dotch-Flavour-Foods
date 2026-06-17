import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactContent } from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Get in touch with us for reservations, catering, or general inquiries."
      />
      <ContactContent />
    </>
  );
}
