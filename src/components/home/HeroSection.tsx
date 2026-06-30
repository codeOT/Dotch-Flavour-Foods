"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { easeOut } from "@/lib/motion";

const heroStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const heroFadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const heroImageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.9, x: 48 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.85, ease: easeOut, delay: 0.2 },
  },
};

const heroBgFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: easeOut },
  },
};

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#052f2a]">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#021f1c]/95 via-[#052f2a]/80 to-[#052f2a]/10"
        initial="hidden"
        animate="visible"
        variants={heroBgFade}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(207,92,11,0.22),transparent_48%)]"
        initial="hidden"
        animate="visible"
        variants={heroBgFade}
        transition={{ delay: 0.2, duration: 1.2 }}
      />

      <div className="container-fluid relative grid min-h-[520px] items-center gap-8 py-10 sm:py-14 lg:grid-cols-2 lg:py-16">
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
            className="mb-5 text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl"
            variants={heroFadeUp}
          >
            Roots in <span className="text-secondary">Flavour.</span>
            <br />
            Crafted with <span className="text-secondary">Care.</span>
          </motion.h1>

          <motion.p
            className="mb-8 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base"
            variants={heroFadeUp}
          >
            Authentic Nigerian soups made with quality ingredients and traditional spice blends.
          </motion.p>

          <motion.div className="flex flex-wrap gap-3" variants={heroFadeUp}>
            <Button href="/ready-to-eat-soups" className="min-w-36">
              Shop Soups
            </Button>
            <Button
              href="/our-menu"
              variant="outline"
              className="min-w-36 border-white/40 text-white hover:bg-white/10"
            >
              View Menu
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[470px]"
          initial="hidden"
          animate="visible"
          variants={heroImageReveal}
        >
          <motion.div
            className="absolute inset-x-10 bottom-2 h-16 rounded-full bg-black/40 blur-2xl"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easeOut }}
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Image
              src="/assets/images/jollof.jpg"
              alt="Signature Dotch soup"
              width={370}
              height={370}
              priority
              className="relative z-10 h-[400px] w-full rounded-3xl object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
