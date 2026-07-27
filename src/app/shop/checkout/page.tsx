import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutContent } from "@/components/pages/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Dotch Flavours Foods order.",
};

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <section className="py-16">
          <div className="container-fluid">
            <div className="h-96 animate-pulse rounded-2xl bg-surface/40" />
          </div>
        </section>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
