"use client";

import { Check, Package } from "lucide-react";
import {
  formatProgressDate,
  getEstimatedDeliveryDate,
  getProgressSteps,
  isProgressTerminal,
  type OrderProgressInput,
} from "@/lib/order-progress";

type DeliveryProgressProps = {
  order: OrderProgressInput;
  className?: string;
};

export function DeliveryProgress({ order, className = "" }: DeliveryProgressProps) {
  const terminal = isProgressTerminal(order.status);

  if (terminal) {
    return (
      <div className={`rounded-xl border border-[#ececec] bg-[#fafafa] px-4 py-4 ${className}`}>
        <p className="text-sm font-semibold text-title">Order progress</p>
        <p className="mt-1 text-sm text-title/60">
          {terminal === "cancelled"
            ? "This order was cancelled."
            : "Payment for this order failed."}
        </p>
      </div>
    );
  }

  const { steps, fillPercent } = getProgressSteps(order);
  const isPickup = order.deliveryMethod === "pickup";
  const estimatedLabel = formatProgressDate(getEstimatedDeliveryDate(order));
  const delivered = steps[3]?.complete;

  return (
    <div className={`rounded-xl border border-[#ececec] bg-white px-4 py-5 sm:px-5 ${className}`}>
      <div className="mb-6">
        <h3 className="text-base font-bold text-title">
          {isPickup ? "Collection progress" : "Delivery progress"}
        </h3>
        {estimatedLabel && (
          <p className="mt-1 text-sm text-title/50">
            {delivered
              ? `${isPickup ? "Collected" : "Delivered"}: ${estimatedLabel}`
              : `Estimated ${isPickup ? "collection" : "delivery"}: ${estimatedLabel}`}
          </p>
        )}
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute top-[18px] right-[12.5%] left-[12.5%] h-[3px] rounded-full bg-[#e5e5e5] sm:top-[20px]"
          aria-hidden
        >
          <div
            className="h-full rounded-full bg-title transition-all duration-500"
            style={{ width: `${fillPercent}%` }}
          />
        </div>

        <ol className="relative grid grid-cols-4">
          {steps.map((step) => {
            const done = step.complete;

            return (
              <li key={step.id} className="flex flex-col items-center text-center">
                <span
                  className={`relative z-[1] flex h-9 w-9 items-center justify-center rounded-full border-2 sm:h-10 sm:w-10 ${
                    done
                      ? "border-[#1b7a4e] bg-[#1b7a4e] text-white"
                      : "border-[#d4d4d4] bg-[#f0f0f0] text-title/40"
                  }`}
                  aria-current={step.current ? "step" : undefined}
                >
                  {done ? (
                    <Check className="h-4 w-4 stroke-[3]" aria-hidden />
                  ) : (
                    <Package className="h-4 w-4" aria-hidden />
                  )}
                </span>
                <span
                  className={`mt-2.5 text-xs font-bold sm:text-sm ${
                    done || step.current ? "text-title" : "text-title/45"
                  }`}
                >
                  {step.label}
                </span>
                <span className="mt-0.5 text-[11px] text-title/45 sm:text-xs">
                  {step.date ?? "—"}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
