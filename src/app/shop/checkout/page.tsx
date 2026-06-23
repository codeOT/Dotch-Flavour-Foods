import type { Metadata } from "next";
import { CheckoutContent } from "@/components/pages/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Dotch Flavours Foods order.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
