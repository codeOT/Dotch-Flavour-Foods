import {
  normalizeOrderStatus,
  type OrderStatus,
} from "@/lib/order-status";

export type ProgressStepId = "ordered" | "confirmed" | "shipped" | "delivered";

export type OrderProgressInput = {
  status: unknown;
  deliveryMethod?: "delivery" | "pickup";
  createdAt?: string | Date | null;
  paidAt?: string | Date | null;
  shippedAt?: string | Date | null;
  deliveredAt?: string | Date | null;
  updatedAt?: string | Date | null;
};

/** How far along the 4-step tracker the order is (0–3). */
export function getProgressStepIndex(status: unknown): number {
  const normalized = normalizeOrderStatus(status);
  switch (normalized) {
    case "delivered":
      return 3;
    case "shipped":
      return 2;
    case "paid":
    case "processing":
      return 1;
    case "pending":
    default:
      return 0;
  }
}

export function isProgressTerminal(status: unknown): "cancelled" | "failed" | null {
  const normalized = normalizeOrderStatus(status);
  if (normalized === "cancelled" || normalized === "failed") return normalized;
  return null;
}

function toDate(value?: string | Date | null): Date | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function formatProgressDay(value?: string | Date | null) {
  const date = toDate(value);
  if (!date) return null;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function formatProgressDate(value?: string | Date | null) {
  const date = toDate(value);
  if (!date) return null;
  return date.toLocaleDateString("en-CA"); // YYYY-MM-DD like the reference
}

export function getEstimatedDeliveryDate(input: OrderProgressInput): Date | null {
  const delivered = toDate(input.deliveredAt);
  if (delivered) return delivered;

  const shipped = toDate(input.shippedAt);
  if (shipped) return addDays(shipped, 2);

  const paid = toDate(input.paidAt);
  if (paid) return addDays(paid, 4);

  const created = toDate(input.createdAt);
  if (created) return addDays(created, 5);

  return null;
}

export function getProgressSteps(input: OrderProgressInput) {
  const status = normalizeOrderStatus(input.status);
  const isPickup = input.deliveryMethod === "pickup";
  const terminal = status === "cancelled" || status === "failed";

  const completedThrough =
    status === "delivered"
      ? 3
      : status === "shipped"
        ? 2
        : status === "paid" || status === "processing"
          ? 1
          : 0;

  const created = toDate(input.createdAt);
  const paid =
    toDate(input.paidAt) ||
    (completedThrough >= 1 ? toDate(input.updatedAt) || created : null);
  const shipped =
    toDate(input.shippedAt) ||
    (completedThrough >= 2 ? toDate(input.updatedAt) : null);
  const delivered =
    toDate(input.deliveredAt) ||
    (completedThrough >= 3 ? toDate(input.updatedAt) : null);

  const labels = isPickup
    ? (["Ordered", "Confirmed", "Ready", "Collected"] as const)
    : (["Ordered", "Confirmed", "Shipped", "Delivered"] as const);

  const dates = [created, paid, shipped, delivered] as const;

  return {
    completedThrough,
    fillPercent: terminal ? 0 : (completedThrough / 3) * 100,
    steps: labels.map((label, index) => ({
      id: (["ordered", "confirmed", "shipped", "delivered"] as const)[index],
      label,
      date: formatProgressDay(dates[index]),
      complete: !terminal && index <= completedThrough,
      current: !terminal && index === completedThrough && status !== "delivered",
    })),
  };
}


/** Set fulfilment timestamps when an order advances (does not clear earlier dates). */
export function applyFulfilmentTimestamps(
  order: {
    paidAt?: Date | null;
    shippedAt?: Date | null;
    deliveredAt?: Date | null;
  },
  nextStatus: OrderStatus,
  at: Date = new Date(),
) {
  if (
    (nextStatus === "paid" ||
      nextStatus === "processing" ||
      nextStatus === "shipped" ||
      nextStatus === "delivered") &&
    !order.paidAt
  ) {
    order.paidAt = at;
  }

  if ((nextStatus === "shipped" || nextStatus === "delivered") && !order.shippedAt) {
    order.shippedAt = at;
  }

  if (nextStatus === "delivered" && !order.deliveredAt) {
    order.deliveredAt = at;
  }
}
