"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  fadeUp,
  mobileFadeUp,
  mobileViewport,
  resolveMobileVariants,
  viewport,
} from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  variants?: Variants;
  delay?: number;
};

export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  ...props
}: RevealProps) {
  const isMobile = useIsMobile();

  const activeVariants = isMobile ? resolveMobileVariants(variants) : variants;
  const activeViewport = isMobile ? mobileViewport : viewport;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={activeViewport}
      variants={activeVariants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Stronger scroll reveal for cards and list items on mobile */
export function RevealCard({
  children,
  className,
  delay = 0,
  ...props
}: Omit<RevealProps, "variants">) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={isMobile ? mobileViewport : viewport}
      variants={isMobile ? mobileFadeUp : fadeUp}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
