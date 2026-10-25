import type { Metadata } from "next";
import { AnimatedFaqList } from "@/components/motion/AnimatedFaqList";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/lib/faq";
import { absoluteTitle, faqJsonLd } from "@/lib/seo";

const faqTitle = "Nigerian Food Delivery & FAQs | Dotch Flavour Foods UK";
const faqDescription =
  "Questions about ready meal shipping or catering orders in London? Contact Dotch Flavour Foods for delivery schedules, shipping areas & customer support.";

export const metadata: Metadata = {
  title: absoluteTitle(faqTitle),
  description: faqDescription,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: faqTitle,
    description: faqDescription,
    url: "/faq",
  },
};

export default function FaqPage() {
  return (
    <section className="overflow-hidden py-12 sm:py-16">
      <JsonLd data={faqJsonLd()} />
      <Reveal className="container-fluid mb-8 max-w-3xl text-center sm:mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">FAQ</p>
        <h1 className="text-3xl font-bold text-title sm:text-4xl">
          Delivery Information & Contact Us
        </h1>
        <p className="mt-3 text-sm text-title/65 sm:text-base">
          Ready Soups, delivery, allergens, catering and how to get in touch.
        </p>
      </Reveal>
      <AnimatedFaqList faqs={faqs} />
    </section>
  );
}
