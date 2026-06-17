"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type HoverCardProps = HTMLMotionProps<"div">;

export function HoverCard({ children, className, ...props }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
