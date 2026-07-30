"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedFaqList } from "@/components/motion/AnimatedFaqList";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { homepageFaqs } from "@/lib/faq";

export function FaqSection() {
  return (
    <section className="overflow-hidden py-12 sm:py-16">
      <StaggerContainer className="container-fluid mb-6 max-w-3xl text-center sm:mb-10">
        <StaggerItem>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary sm:text-sm">
            FAQ
          </p>
        </StaggerItem>
        <StaggerItem>
          <h2 className="text-balance text-[clamp(1.35rem,5.5vw,2.25rem)] font-bold leading-snug sm:text-3xl md:text-4xl">
            Frequently Asked Questions
          </h2>
        </StaggerItem>
      </StaggerContainer>
      <AnimatedFaqList faqs={homepageFaqs} />
      <div className="mt-8 flex justify-center">
        <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Button href="/faq" variant="outline">
            View all FAQs
          </Button>
        </motion.div>
      </div>
      <p className="mt-3 text-center text-sm text-title/55">
        Or{" "}
        <Link href="/contact-us" className="font-semibold text-primary hover:underline">
          contact us
        </Link>{" "}
        with a specific question.
      </p>
    </section>
  );
}
