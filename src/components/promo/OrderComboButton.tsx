"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { promoComboToCartItem, type PromoCombo } from "@/lib/promo";

type OrderComboButtonProps = {
  combo: PromoCombo;
  label?: string;
  variant?: "primary" | "outline" | "white";
  fullWidth?: boolean;
  className?: string;
};

export function OrderComboButton({
  combo,
  label = "Checkout",
  variant = "primary",
  fullWidth,
  className,
}: OrderComboButtonProps) {
  const { addItem } = useCart();
  const router = useRouter();

  return (
    <Button
      type="button"
      variant={variant}
      fullWidth={fullWidth}
      className={className}
      onClick={() => {
        addItem(promoComboToCartItem(combo));
        router.push("/shop/checkout");
      }}
    >
      {label}
    </Button>
  );
}
