"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import {
  buildMixedBundleCartItem,
  formatReadySoupPrice,
  getMixSelectionTotal,
  readySoupProducts,
  type MixSelection,
  type ReadySoupBundle,
} from "@/lib/ready-soups";

type ReadySoupBundleBuilderProps = {
  bundle: ReadySoupBundle;
  onClose: () => void;
};

export function ReadySoupBundleBuilder({ bundle, onClose }: ReadySoupBundleBuilderProps) {
  const { addItem, openCart } = useCart();
  const [selection, setSelection] = useState<MixSelection>({});
  const [error, setError] = useState("");

  const selectedTotal = useMemo(() => getMixSelectionTotal(selection), [selection]);
  const remaining = bundle.soupCount - selectedTotal;

  function setQty(productId: string, next: number) {
    setError("");
    setSelection((current) => {
      const safe = Math.max(0, next);
      const without = { ...current, [productId]: 0 };
      const others = getMixSelectionTotal(without);
      const capped = Math.min(safe, bundle.soupCount - others);
      if (capped <= 0) {
        const rest = { ...current };
        delete rest[productId];
        return rest;
      }
      return { ...current, [productId]: capped };
    });
  }

  function addBundleToCart() {
    if (selectedTotal !== bundle.soupCount) {
      setError(`Please select exactly ${bundle.soupCount} soups (currently ${selectedTotal}).`);
      return;
    }
    addItem(buildMixedBundleCartItem(bundle, selection));
    openCart();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bundle-builder-title"
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-surface bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
              Mix & match
            </p>
            <h2 id="bundle-builder-title" className="text-xl font-bold text-title">
              {bundle.name}
            </h2>
            <p className="mt-1 text-sm text-title/65">
              Choose {bundle.soupCount} soups · {formatReadySoupPrice(bundle.price)} ·{" "}
              {remaining === 0 ? "Ready to add" : `${remaining} remaining`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-title/50 transition hover:bg-surface hover:text-title"
            aria-label="Close bundle builder"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 px-5 py-5 sm:px-6">
          {readySoupProducts.map((product) => {
            const qty = selection[product.id] ?? 0;
            return (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-2xl border border-surface bg-surface/20 p-3"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-title">{product.name}</p>
                  <p className="text-xs text-title/55">{product.size}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQty(product.id, qty - 1)}
                    disabled={qty === 0}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-surface disabled:opacity-40"
                    aria-label={`Decrease ${product.name}`}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(product.id, qty + 1)}
                    disabled={remaining === 0}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-surface disabled:opacity-40"
                    aria-label={`Increase ${product.name}`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sticky bottom-0 border-t border-surface bg-white px-5 py-4 sm:px-6">
          {error && <p className="mb-3 text-sm font-medium text-red-600">{error}</p>}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-title/70">
              Selected <span className="font-bold text-title">{selectedTotal}</span> of{" "}
              <span className="font-bold text-title">{bundle.soupCount}</span>
            </p>
            <Button type="button" onClick={addBundleToCart} disabled={selectedTotal !== bundle.soupCount}>
              Add bundle · {formatReadySoupPrice(bundle.price)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
