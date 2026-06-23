"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  mobileStaggerContainer,
  mobileStaggerItem,
  staggerContainer,
  staggerItem,
  viewport,
} from "@/lib/motion";

type StaggerContainerProps = HTMLMotionProps<"div">;

export function StaggerContainer({ children, className, ...props }: StaggerContainerProps) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial="hidden"
      animate={isMobile ? "visible" : undefined}
      whileInView={isMobile ? undefined : "visible"}
      viewport={isMobile ? undefined : viewport}
      variants={isMobile ? mobileStaggerContainer : staggerContainer}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = HTMLMotionProps<"div">;

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      variants={isMobile ? mobileStaggerItem : staggerItem}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
