"use client";

import { motion } from "framer-motion";
import { NewsletterSignup } from "@/components/forms/NewsletterSignup";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { scaleIn } from "@/lib/motion";

export function NewsletterSection() {
  return (
    <section className="overflow-hidden bg-[#192e22] py-12 text-white sm:py-16">
      <div className="container-fluid min-w-0">
        <Reveal className="mx-auto w-full min-w-0 max-w-xl">
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8"
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <StaggerContainer className="mb-5 text-center">
              <StaggerItem>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
                  Newsletter
                </p>
              </StaggerItem>
              <StaggerItem>
                <h2 className="text-2xl font-bold sm:text-3xl">Stay close to the brand</h2>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-2 text-sm text-white/70">
                  Launch updates, Ready Soups offers, experiences, and merchandise news — opt in
                  below.
                </p>
              </StaggerItem>
            </StaggerContainer>
            <Reveal delay={0.2}>
              <NewsletterSignup variant="dark" />
            </Reveal>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
