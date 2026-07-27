"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { formatPrice } from "@/lib/site";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type OrderSummary = {
  id: string;
  orderNumber: string;
  status: "pending" | "paid" | "failed" | "cancelled";
  deliveryMethod: "delivery" | "pickup";
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  fullName: string;
  email: string;
  phone: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postcode?: string;
  notes?: string;
  createdAt?: string;
};

const statusStyles: Record<OrderSummary["status"], string> = {
  pending: "bg-secondary/10 text-secondary",
  paid: "bg-primary/10 text-primary",
  failed: "bg-red-100 text-red-700",
  cancelled: "bg-title/10 text-title/70",
};

const statusLabels: Record<OrderSummary["status"], string> = {
  pending: "Awaiting payment",
  paid: "Paid / confirmed",
  failed: "Payment failed",
  cancelled: "Cancelled",
};

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function OrderCard({ order }: { order: OrderSummary }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
      >
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <p className="font-bold text-title">{order.orderNumber}</p>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusStyles[order.status]}`}
            >
              {statusLabels[order.status]}
            </span>
          </div>
          <p className="text-sm text-title/60">{formatDate(order.createdAt)}</p>
          <p className="mt-1 text-sm text-title/70">
            {order.items.length} item{order.items.length === 1 ? "" : "s"} ·{" "}
            {order.deliveryMethod === "delivery" ? "Home delivery" : "Collection"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <p className="text-lg font-bold text-primary">{formatPrice(order.total)}</p>
          <ChevronDown
            className={`h-5 w-5 text-title/50 transition ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div className="border-t border-surface px-5 py-5 sm:px-6">
          <ul className="mb-5 space-y-3">
            {order.items.map((item) => (
              <li key={`${order.id}-${item.id}`} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-title">{item.name}</p>
                  <p className="text-xs text-title/60">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-primary">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-surface/40 p-4 text-sm">
              <p className="mb-2 flex items-center gap-2 font-semibold text-title">
                {order.deliveryMethod === "delivery" ? (
                  <Truck className="h-4 w-4 text-secondary" />
                ) : (
                  <Package className="h-4 w-4 text-secondary" />
                )}
                {order.deliveryMethod === "delivery" ? "Delivery details" : "Collection"}
              </p>
              {order.deliveryMethod === "delivery" ? (
                <p className="flex gap-2 text-title/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {[order.addressLine1, order.addressLine2, order.city, order.postcode]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </p>
              ) : (
                <p className="text-title/70">Ready for collection once confirmed.</p>
              )}
            </div>

            <div className="rounded-xl bg-surface/40 p-4 text-sm">
              <p className="mb-2 font-semibold text-title">Order totals</p>
              <dl className="space-y-1.5 text-title/70">
                <div className="flex justify-between gap-3">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(order.subtotal)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Delivery</dt>
                  <dd>{order.deliveryFee === 0 ? "Free" : formatPrice(order.deliveryFee)}</dd>
                </div>
                <div className="flex justify-between gap-3 border-t border-surface pt-1.5 font-semibold text-title">
                  <dt>Total</dt>
                  <dd className="text-primary">{formatPrice(order.total)}</dd>
                </div>
              </dl>
            </div>
          </div>

          {order.notes && (
            <p className="rounded-xl border border-surface bg-white p-4 text-sm text-title/70">
              <span className="font-semibold text-title">Notes: </span>
              {order.notes}
            </p>
          )}
        </div>
      )}
    </article>
  );
}

export function MyOrdersContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/sign-in?callbackUrl=/orders");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    let cancelled = false;

    async function loadOrders() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/orders");
        const data = (await response.json()) as { orders?: OrderSummary[]; error?: string };

        if (!response.ok) {
          if (!cancelled) setError(data.error ?? "Unable to load orders.");
          return;
        }

        if (!cancelled) setOrders(data.orders ?? []);
      } catch {
        if (!cancelled) setError("Unable to load orders.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadOrders();
    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <section className="py-16">
        <div className="container-fluid">
          <div className="h-72 animate-pulse rounded-2xl bg-surface/40" />
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-white py-12 sm:py-16">
      <div className="container-fluid min-w-0 max-w-4xl">
        <Reveal className="mb-8 sm:mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary sm:text-sm">
            Your account
          </p>
          <h1 className="text-balance text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-tight text-title">
            My orders
          </h1>
          <p className="mt-3 text-sm text-title/70 sm:text-base">
            Track and review orders for{" "}
            <span className="font-medium text-title">
              {session?.user?.name || session?.user?.email}
            </span>
            .
          </p>
        </Reveal>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-28 animate-pulse rounded-2xl bg-surface/40" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <Reveal className="rounded-2xl border border-surface bg-surface/20 p-8 text-center sm:p-12">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShoppingBag className="h-7 w-7" />
            </span>
            <h2 className="mb-2 text-xl font-bold text-title">No orders yet</h2>
            <p className="mb-6 text-sm text-title/70">
              When you place an order while signed in, it will show up here for tracking.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/ready-to-eat-soups">Shop ready soups</Button>
              <Button href="/fresh-menu" variant="outline">
                Browse fresh menu
              </Button>
            </div>
          </Reveal>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-sm text-title/60">
          Need help with an order?{" "}
          <Link href="/contact-us" className="font-semibold text-primary hover:underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
