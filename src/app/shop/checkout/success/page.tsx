import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutSuccessContent } from "@/components/pages/CheckoutSuccessContent";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your Dotch Flavours Foods payment was successful.",
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="py-16">
          <div className="container-fluid">
            <div className="mx-auto h-72 max-w-lg animate-pulse rounded-2xl bg-surface/40" />
          </div>
        </section>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
