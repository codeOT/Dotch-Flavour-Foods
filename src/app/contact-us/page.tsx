import type { Metadata } from "next";
import { ContactContent } from "@/components/pages/ContactContent";

import { absoluteTitle } from "@/lib/seo";

const contactTitle = "Nigerian Food Delivery & FAQs | Dotch Flavour Foods UK";
const contactDescription =
  "Questions about ready meal shipping or catering orders in London? Contact Dotch Flavour Foods for delivery schedules, shipping areas & customer support.";

export const metadata: Metadata = {
  title: absoluteTitle(contactTitle),
  description: contactDescription,
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: contactTitle,
    description: contactDescription,
    url: "/contact-us",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
