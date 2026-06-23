"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CartRedirectPage() {
  const router = useRouter();
  const { openCart } = useCart();

  useEffect(() => {
    openCart();
    router.replace("/");
  }, [openCart, router]);

  return null;
}
