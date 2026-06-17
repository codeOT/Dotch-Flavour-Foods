"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-primary-dark py-16 text-white">
      <motion.div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-secondary/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container-fluid relative"
      >
        <motion.h1 variants={staggerItem} className="text-4xl font-bold md:text-5xl">
          {title}
        </motion.h1>
        {description && (
          <motion.p variants={staggerItem} className="mt-4 max-w-2xl text-white/75">
            {description}
          </motion.p>
        )}
        <motion.div
          variants={fadeUp}
          className="mt-6 h-1 w-20 rounded-full bg-secondary"
        />
      </motion.div>
    </section>
  );
}
