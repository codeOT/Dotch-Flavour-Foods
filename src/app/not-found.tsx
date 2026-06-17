"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { scaleIn } from "@/lib/motion";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-24">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="container-fluid text-center"
      >
        <motion.h1
          className="mb-4 text-7xl font-bold text-primary"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          404
        </motion.h1>
        <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-8 text-title/70">The page you are looking for does not exist.</p>
        <Button href="/">Back to Home</Button>
      </motion.div>
    </section>
  );
}
