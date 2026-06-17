"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { mobileViewport, viewport } from "@/lib/motion";

export function useScrollMotion() {
  const isMobile = useIsMobile();

  return {
    isMobile,
    viewport: isMobile ? mobileViewport : viewport,
    from: isMobile
      ? { opacity: 0, y: 36, scale: 0.97 }
      : { opacity: 0, y: 32 },
    to: isMobile
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 1, y: 0 },
    transition: isMobile
      ? { type: "spring" as const, stiffness: 330, damping: 26 }
      : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  };
}
