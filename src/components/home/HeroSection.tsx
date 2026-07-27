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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: easeOut },
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
          alt="Steaming Dotch Flavours soup bowl with braised meat and greens"
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
          className="max-w-xl"
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
            className="mb-5 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-[3.5rem]"
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
              <div key={item.label} className="flex items-center gap-2 text-sm text-white/85">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <item.icon className="h-4 w-4" />
                </span>
                {item.label}
              </div>
            ))}
          </motion.div>

          <motion.div className="mb-6 flex flex-wrap gap-3" variants={heroFadeUp}>
            <Button href="/ready-to-eat-soups" className="min-w-36 bg-secondary hover:bg-secondary/90">
              Shop Soups
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="/our-menu"
              variant="outline"
              className="min-w-36 border-white/35 text-white hover:bg-white/10"
            >
              View Menu
            </Button>
          </motion.div>

          <motion.div className="mb-6 flex items-center gap-3" variants={heroFadeUp}>
            <div className="flex -space-x-2">
              {["A", "B", "C"].map((initial) => (
                <span
                  key={initial}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0d1612] bg-primary text-[10px] font-bold text-white"
                >
                  {initial}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-secondary">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-white/70">Loved by customers across the UK</p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:grid-cols-4"
            variants={heroFadeUp}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-lg font-bold text-secondary sm:text-xl">{stat.value}</p>
                <p className="text-[11px] uppercase tracking-wider text-white/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="relative border-t border-[#192e22]/10 bg-surface">
        <div className="container-fluid grid grid-cols-2 gap-4 py-4 sm:grid-cols-4 sm:gap-6 sm:py-5">
          {guarantees.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                <item.icon className="h-4 w-4" />
              </span>
              <p className="text-xs font-semibold text-title sm:text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
