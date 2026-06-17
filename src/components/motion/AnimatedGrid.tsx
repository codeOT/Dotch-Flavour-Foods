"use client";

import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

type AnimatedGridProps = {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
};

export function AnimatedGrid({ children, className, itemClassName }: AnimatedGridProps) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <StaggerContainer className={className}>
      {items.map((child, index) => (
        <StaggerItem key={index} className={itemClassName}>
          <HoverCard>{child}</HoverCard>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
