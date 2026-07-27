"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { formatPrice } from "@/lib/site";

type OrderResult = {
  orderNumber: string;
  email: string;
  total: number;
  status: string;
};

export function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing payment session.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadOrder() {
      try {
        const response = await fetch(
          `/api/orders/session?session_id=${encodeURIComponent(sessionId!)}`,
        );
        const data = (await response.json()) as OrderResult & { error?: string };

        if (!response.ok) {
          if (!cancelled) setError(data.error ?? "Unable to load your order.");
          return;
        }

        if (!cancelled) {
          setOrder(data);
          clearCart();
        }
      } catch {
        if (!cancelled) setError("Unable to load your order.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadOrder();
    return () => {
      cancelled = true;
    };
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container-fluid">
          <div className="mx-auto h-72 max-w-lg animate-pulse rounded-2xl bg-surface/40" />
        </div>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="py-16">
        <div className="container-fluid text-center">
          <h1 className="mb-3 text-2xl font-bold">Payment received</h1>
          <p className="mb-6 text-title/70">
            {error ||
              "We could not load the order details yet. Check your email for confirmation."}
          </p>
          <Button href="/">Continue Shopping</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container-fluid">
        <Reveal className="mx-auto max-w-lg text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
          >
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </motion.div>
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Payment successful!</h1>
          <p className="mb-6 text-title/70">
            Thank you for your order. We&apos;ve received your payment and will confirm by email
            shortly.
          </p>

          <div className="mb-8 rounded-2xl border border-surface bg-surface/30 p-6 text-left text-sm">
            <dl className="space-y-3">
              <div className="flex justify-between gap-4">
                <dt className="text-title/60">Order number</dt>
                <dd className="font-bold text-primary">{order.orderNumber}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-title/60">Confirmation sent to</dt>
                <dd className="font-medium">{order.email}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-surface pt-3">
                <dt className="font-semibold">Total paid</dt>
                <dd className="text-lg font-bold text-primary">{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/orders">View my orders</Button>
            <Button href="/" variant="outline">
              Continue Shopping
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
