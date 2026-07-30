"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Leaf,
  Package,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { easeOut } from "@/lib/motion";

const heroStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const heroFadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const heroBgFade: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: easeOut },
  },
};

const guaranteeStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const guaranteeItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

const highlights = [
  { label: "Authentic", icon: Sparkles },
  { label: "Fresh", icon: Leaf },
  { label: "Delivery", icon: Truck },
] as const;

const stats = [
  { value: "10+", label: "Soups" },
  { value: "10K+", label: "Orders" },
  { value: "4.9", label: "Rating" },
  { value: "UK", label: "Delivery" },
] as const;

const guarantees = [
  { label: "Fast Delivery", icon: Truck },
  { label: "Secure Payment", icon: ShieldCheck },
  { label: "Hygienic Prep", icon: Leaf },
  { label: "Quality Packaging", icon: Package },
] as const;

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate="visible"
        variants={heroBgFade}
      >
        <Image
          src="/assets/images/hero-bg.png"
          alt="Steaming Dotch Flavour soup bowl with braised meat and greens"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] sm:object-[72%_center]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1612]/94 via-[#0d1612]/72 to-[#0d1612]/20 sm:via-[#0d1612]/60 sm:to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_80%,rgba(87,72,33,0.28),transparent_42%)]" />

      <div className="container-fluid relative flex min-h-[72vh] items-center py-14 sm:min-h-[80vh] sm:py-16 lg:min-h-[88vh] lg:py-20">
        <motion.div
          className="w-full min-w-0 max-w-xl"
          initial="hidden"
          animate="visible"
          variants={heroStagger}
        >
          <motion.p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-secondary"
            variants={heroFadeUp}
          >
            Welcome to Dotch
          </motion.p>

          <motion.h1
            className="mb-5 font-display text-[clamp(1.75rem,8vw,3.5rem)] font-bold leading-[1.05] text-white"
            variants={heroFadeUp}
          >
            Roots in <span className="text-secondary">Flavour.</span>
            <br />
            Crafted with <span className="text-secondary">Care.</span>
          </motion.h1>

          <motion.p
            className="mb-7 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base"
            variants={heroFadeUp}
          >
            Authentic Nigerian soups made with quality ingredients and traditional spice blends.
          </motion.p>

          <motion.div
            className="mb-7 flex flex-wrap gap-x-5 gap-y-3"
            variants={heroFadeUp}
          >
            {highlights.map((item) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2 text-sm text-white/85"
                whileHover={{ y: -2, scale: 1.04 }}
              >
                <motion.span
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/15 text-secondary"
                  whileHover={{ rotate: 12 }}
                >
                  <item.icon className="h-4 w-4" />
                </motion.span>
                {item.label}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mb-6 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap"
            variants={heroFadeUp}
          >
            <Button
              href="/ready-to-eat-soups"
              fullWidth
              className="!bg-secondary hover:!bg-secondary/90 sm:!w-auto"
            >
              Shop Ready Soups
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Button>
            <Button
              href="/fresh-menu"
              variant="outline"
              fullWidth
              className="!border-white/35 !text-white hover:!bg-white/10 sm:!w-auto"
            >
              Order Fresh
            </Button>
            <Button
              href="/request-a-quote"
              variant="outline"
              fullWidth
              className="!border-white/35 !text-white hover:!bg-white/10 sm:!w-auto"
            >
              Catering Quote
            </Button>
          </motion.div>

          <motion.div className="mb-6 flex min-w-0 items-center gap-3" variants={heroFadeUp}>
            <div className="flex shrink-0 -space-x-2">
              {["A", "B", "C"].map((initial, index) => (
                <motion.span
                  key={initial}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0d1612] bg-primary text-[10px] font-bold text-white"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 300 }}
                >
                  {initial}
                </motion.span>
              ))}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-secondary">
                {Array.from({ length: 5 }).map((_, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.06, type: "spring", stiffness: 400 }}
                  >
                    <Star className="h-3.5 w-3.5 fill-current" />
                  </motion.span>
                ))}
              </div>
              <p className="text-xs text-white/70">Loved by customers across the UK</p>
            </div>
          </motion.div>

          <motion.div
            className="grid w-full min-w-0 grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:grid-cols-4"
            variants={heroFadeUp}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="min-w-0 text-center sm:text-left"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.08, duration: 0.4, ease: easeOut }}
                whileHover={{ y: -2 }}
              >
                <p className="text-lg font-bold text-secondary sm:text-xl">{stat.value}</p>
                <p className="text-[11px] uppercase tracking-wider text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="relative border-t border-[#192e22]/10 bg-surface"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={guaranteeStagger}
      >
        <div className="container-fluid grid w-full min-w-0 grid-cols-2 gap-3 py-4 sm:grid-cols-4 sm:gap-6 sm:py-5">
          {guarantees.map((item) => (
            <motion.div
              key={item.label}
              className="flex min-w-0 items-center gap-2 sm:gap-3"
              variants={guaranteeItem}
              whileHover={{ y: -2, x: 2 }}
            >
              <motion.span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary"
                whileHover={{ rotate: 10, scale: 1.08 }}
              >
                <item.icon className="h-4 w-4" />
              </motion.span>
              <p className="min-w-0 text-xs font-semibold leading-snug text-title sm:text-sm">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
