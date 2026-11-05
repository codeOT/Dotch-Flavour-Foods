"use client";

import { Button } from "@/components/ui/Button";

export function OrderOnWhatsAppButton({
  href,
  compact = false,
  fullWidth = false,
}: {
  href: string;
  compact?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <Button
      href={href}
      fullWidth={fullWidth}
      className={
        compact
          ? "!px-3 !py-2 !text-[10px] sm:!px-4 sm:!py-2 sm:!text-xs"
          : undefined
      }
    >
      {compact ? "Order now" : "Place an order"}
    </Button>
  );
}
