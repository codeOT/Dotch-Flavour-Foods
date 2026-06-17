"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

type Faq = {
  question: string;
  answer: string;
};

type AnimatedFaqListProps = {
  faqs: Faq[];
};

export function AnimatedFaqList({ faqs }: AnimatedFaqListProps) {
  return (
    <StaggerContainer className="container-fluid max-w-3xl space-y-4">
      {faqs.map((faq) => (
        <StaggerItem key={faq.question}>
          <motion.details
            className="group rounded-xl border border-surface bg-white p-6"
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(87, 72, 33, 0.1)" }}
          >
            <summary className="cursor-pointer font-semibold transition group-open:text-primary">
              {faq.question}
            </summary>
            <p className="mt-3 text-sm text-title/70">{faq.answer}</p>
          </motion.details>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
