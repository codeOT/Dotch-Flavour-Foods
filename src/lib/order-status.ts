export const ORDER_STATUSES = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "failed",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

/** Statuses that mean payment was taken / order is active fulfilment. */
export const PAID_FLOW_STATUSES: OrderStatus[] = [
  "paid",
  "processing",
  "shipped",
  "delivered",
];

/** Statuses an admin can set from the dashboard. */
export const ADMIN_SETTABLE_STATUSES: OrderStatus[] = [
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: "Awaiting payment",
  paid: "Paid / confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  failed: "Payment failed",
  cancelled: "Cancelled",
};

export const orderStatusStyles: Record<OrderStatus, string> = {
  pending: "border-[#cf5c0b]/40 bg-[#fff4eb] text-[#9e4122]",
  paid: "border-[#574821]/35 bg-[#f3efe6] text-[#574821]",
  processing: "border-[#b45309]/40 bg-[#fff7ed] text-[#9a3412]",
  shipped: "border-[#0369a1]/35 bg-[#f0f9ff] text-[#075985]",
  delivered: "border-[#047857]/35 bg-[#ecfdf5] text-[#065f46]",
  failed: "border-[#b91c1c]/35 bg-[#fef2f2] text-[#991b1b]",
  cancelled: "border-[#192e22]/20 bg-[#f3f4f3] text-[#192e22]/70",
};

export function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === "string" && ORDER_STATUSES.includes(value as OrderStatus);
}

export function normalizeOrderStatus(value: unknown): OrderStatus {
  return isOrderStatus(value) ? value : "pending";
}
