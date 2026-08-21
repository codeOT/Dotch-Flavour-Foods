import {
  normalizeOrderStatus,
  orderStatusLabels,
  type OrderStatus,
} from "@/lib/order-status";

const badgeStyles: Record<OrderStatus, string> = {
  pending: "border-[#cf5c0b]/40 bg-[#fff4eb] text-[#9e4122]",
  paid: "border-[#574821]/35 bg-[#f3efe6] text-[#574821]",
  processing: "border-[#b45309]/40 bg-[#fff7ed] text-[#9a3412]",
  shipped: "border-[#0369a1]/35 bg-[#f0f9ff] text-[#075985]",
  delivered: "border-[#047857]/35 bg-[#ecfdf5] text-[#065f46]",
  failed: "border-[#b91c1c]/35 bg-[#fef2f2] text-[#991b1b]",
  cancelled: "border-[#192e22]/20 bg-[#f3f4f3] text-[#192e22]/70",
};

type OrderStatusBadgeProps = {
  status: unknown;
  className?: string;
};

export function OrderStatusBadge({ status, className = "" }: OrderStatusBadgeProps) {
  const normalized = normalizeOrderStatus(status);

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeStyles[normalized]} ${className}`}
    >
      {orderStatusLabels[normalized]}
    </span>
  );
}
