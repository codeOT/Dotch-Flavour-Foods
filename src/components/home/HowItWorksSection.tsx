"use client";

import { motion } from "framer-motion";
import { Package, Snowflake, Soup, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { DELIVERY_FEE_UP_TO_20L, DELIVERY_FEE_UP_TO_25L } from "@/lib/cart-utils";
import { formatPrice } from "@/lib/site";

const steps = [
  {
    icon: Soup,
    title: "Choose your soups",
    text: "Browse Ready Soups by Dotch Flavour — mix flavours or pick a 3, 5, 10, or 18 pack.",
  },
  {
    icon: Package,
    title: "We cook & freeze",
    text: "Every batch is cooked from scratch, then frozen carefully so flavour holds until you’re ready.",
  },
  {
    icon: Truck,
    title: "Delivered to you",
    text: `Flat ${formatPrice(DELIVERY_FEE_UP_TO_20L)} delivery up to 20kg (or ${formatPrice(DELIVERY_FEE_UP_TO_25L)} up to 25kg) — or collect. Order 8am–3pm for next-day delivery. Minimum 3 Ready Soups online.`,
  },
  {
    icon: Snowflake,
    title: "Heat & serve",
    text: "Keep in the freezer, heat when you need a proper Nigerian meal — no hours at the stove.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="overflow-hidden bg-surface/30 py-12 sm:py-16">
      <div className="container-fluid min-w-0">
        <StaggerContainer className="mb-10 text-center">
          <StaggerItem>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              How it works
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="text-2xl font-bold text-title sm:text-3xl md:text-4xl">
              From our kitchen to your freezer
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-3 max-w-xl text-sm text-title/65 sm:text-base">
              Authentic flavour, built for busy weeks — order once, eat well all month.
            </p>
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <StaggerItem key={step.title}>
              <motion.div
                className="h-full text-center sm:text-left"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <motion.span
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white"
                  whileHover={{ rotate: 8, scale: 1.08 }}
                >
                  <step.icon className="h-5 w-5" />
                </motion.span>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-secondary">
                  Step {index + 1}
                </p>
                <h3 className="mb-2 text-lg font-bold text-title">{step.title}</h3>
                <p className="text-sm leading-relaxed text-title/70">{step.text}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal className="mt-10 text-center">
          <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Button href="/ready-to-eat-soups">Shop Ready Soups</Button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
