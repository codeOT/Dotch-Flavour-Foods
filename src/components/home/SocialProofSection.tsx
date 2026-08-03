"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { ReviewStars } from "@/components/ready-soups/ReadySoupCards";
import { readySoupReviews } from "@/lib/ready-soups";

export function SocialProofSection() {
  const reviews = readySoupReviews.slice(0, 3);

  return (
    <section className="overflow-hidden bg-white py-12 sm:py-16">
      <div className="container-fluid min-w-0">
        <StaggerContainer className="mb-10 text-center">
          <StaggerItem>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              Customer love
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="text-2xl font-bold text-title sm:text-3xl md:text-4xl">
              Flavour people keep coming back for
            </h2>
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <StaggerItem key={review.name}>
              <motion.div
                className="h-full rounded-2xl border border-surface bg-surface/20 p-6"
                whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(87, 72, 33, 0.1)" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="mb-3">
                  <ReviewStars rating={review.rating} />
                </div>
                <p className="mb-4 text-sm leading-relaxed text-title/80">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="text-sm font-semibold text-title">{review.name}</p>
                <p className="text-xs text-title/55">{review.location}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
