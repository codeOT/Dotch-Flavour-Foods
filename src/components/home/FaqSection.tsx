import { AnimatedFaqList } from "@/components/motion/AnimatedFaqList";
import { Reveal } from "@/components/motion/Reveal";

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

export function FaqSection() {
  return (
    <section className="overflow-hidden py-12 sm:py-16">
      <Reveal className="container-fluid mb-6 max-w-3xl text-center sm:mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary sm:text-sm">
          FAQ
        </p>
        <h2 className="text-balance text-[clamp(1.35rem,5.5vw,2.25rem)] font-bold leading-snug sm:text-3xl md:text-4xl">
          Frequently Asked Questions
        </h2>
      </Reveal>
      <AnimatedFaqList faqs={faqs} />
    </section>
  );
}
