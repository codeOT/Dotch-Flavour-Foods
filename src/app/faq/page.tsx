import type { Metadata } from "next";
import { AnimatedFaqList } from "@/components/motion/AnimatedFaqList";
import { Reveal } from "@/components/motion/Reveal";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about Dotch Flavour Ready Soups, delivery, allergens, catering, payment and more.",
};

export default function FaqPage() {
  return (
    <section className="overflow-hidden py-12 sm:py-16">
      <Reveal className="container-fluid mb-8 max-w-3xl text-center sm:mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">FAQ</p>
        <h1 className="text-3xl font-bold text-title sm:text-4xl">Frequently asked questions</h1>
        <p className="mt-3 text-sm text-title/65 sm:text-base">
          Ready Soups, delivery, allergens, catering and how to get in touch.
        </p>
      </Reveal>
      <AnimatedFaqList faqs={faqs} />
    </section>
  );
}
