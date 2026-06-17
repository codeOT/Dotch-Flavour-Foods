import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimatedFaqList } from "@/components/motion/AnimatedFaqList";

export const metadata: Metadata = {
  title: "FAQ",
};

const faqs = [
  {
    question: "What are your opening hours?",
    answer: "We are open Monday to Sunday from 9:00 AM to 11:00 PM.",
  },
  {
    question: "Do you offer delivery?",
    answer: "Yes, we deliver across London and surrounding areas in the UK.",
  },
  {
    question: "Can I book a table online?",
    answer: "Absolutely. Use the booking form on our homepage or contact page.",
  },
  {
    question: "Do you cater for events?",
    answer: "Yes, we offer catering services for private and corporate events.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader title="FAQ" description="Frequently asked questions about our restaurant." />
      <section className="py-16">
        <AnimatedFaqList faqs={faqs} />
      </section>
    </>
  );
}
