"use client";

import { Gift, Sandwich, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { features } from "@/lib/navigation";
import { HoverCard } from "@/components/motion/HoverCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";

const icons = [Gift, Sandwich, UtensilsCrossed];

export function FeaturesSection() {
  return (
    <section className="overflow-hidden py-12 sm:py-16">
      <div className="container-fluid min-w-0">
        <Reveal className="mb-8 text-center sm:mb-10">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Why Choose Us</h2>
        </Reveal>
        <StaggerContainer className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <StaggerItem key={feature.title}>
                <HoverCard className="flex gap-5 rounded-2xl border border-surface bg-white p-6 shadow-sm">
                  <motion.div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                    whileHover={{ rotate: 12, scale: 1.1 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h5 className="mb-2 text-lg font-semibold">
                      <Link href="/services" className="hover:text-primary">
                        {feature.title}
                      </Link>
                    </h5>
                    <p className="text-sm text-title/70">{feature.description}</p>
                  </div>
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
