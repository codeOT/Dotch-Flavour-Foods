"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Package, Truck } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { type DeliveryMethod } from "@/lib/cart-utils";
import { siteConfig } from "@/lib/site";

type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  notes: string;
};

const initialForm: CheckoutForm = {
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postcode: "",
  notes: "",
};

const inputClassName =
  "w-full rounded-lg border border-surface bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20";

function CheckoutSteps({ current, onOpenCart }: { current: 1 | 2 | 3; onOpenCart: () => void }) {
  const steps = [
    { num: 1 as const, label: "Cart", action: onOpenCart },
    { num: 2 as const, label: "Checkout" },
    { num: 3 as const, label: "Confirmation" },
  ];

  return (
    <nav aria-label="Checkout progress" className="mb-10">
      <ol className="flex items-center justify-center gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const isComplete = step.num < current;
          const isCurrent = step.num === current;

          return (
            <li key={step.label} className="flex items-center gap-2 sm:gap-4">
              {"action" in step && isComplete ? (
                <button
                  type="button"
                  onClick={step.action}
                  className="flex items-center gap-2 text-sm font-medium text-primary transition hover:text-secondary"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {step.num}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              ) : (
                <span
                  className={`flex items-center gap-2 text-sm font-medium ${
                    isCurrent ? "text-primary" : isComplete ? "text-primary/70" : "text-title/40"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      isCurrent
                        ? "bg-secondary text-white"
                        : isComplete
                          ? "bg-primary text-white"
                          : "bg-surface text-title/50"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </span>
              )}
              {index < steps.length - 1 && (
                <span className="hidden h-px w-8 bg-surface sm:block sm:w-12" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { items, subtotal, isHydrated, openCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const cancelled = searchParams.get("cancelled") === "1";

  useEffect(() => {
    if (isHydrated && items.length === 0) {
      openCart();
      router.replace("/");
    }
  }, [isHydrated, items.length, router, openCart]);

  useEffect(() => {
    if (!session?.user) return;
    setForm((current) => ({
      ...current,
      fullName: current.fullName || session.user.name || "",
      email: current.email || session.user.email || "",
    }));
  }, [session]);

  const updateField = (field: keyof CheckoutForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          deliveryMethod,
          ...form,
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setSubmitError(data.error ?? "Unable to start checkout. Please try again.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setSubmitError("Unable to start checkout. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) {
    return (
      <section className="py-16">
        <div className="container-fluid">
          <div className="h-96 animate-pulse rounded-2xl bg-surface/40" />
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="container-fluid">
        <CheckoutSteps current={2} onOpenCart={openCart} />

        {cancelled && (
          <p className="mb-6 rounded-xl border border-secondary/30 bg-secondary/5 px-4 py-3 text-center text-sm text-title">
            Payment was cancelled. You can review your details and try again.
          </p>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start xl:grid-cols-[1fr_24rem]">
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-8">
              <fieldset className="rounded-2xl border border-surface bg-white p-5 shadow-sm sm:p-6">
                <legend className="mb-5 px-1 text-lg font-bold">Contact details</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium">
                      Full name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className={inputClassName}
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={inputClassName}
                      placeholder={siteConfig.contact.email}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className={inputClassName}
                      placeholder={siteConfig.contact.phone}
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset className="rounded-2xl border border-surface bg-white p-5 shadow-sm sm:p-6">
                <legend className="mb-5 px-1 text-lg font-bold">Delivery method</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      {
                        id: "delivery" as const,
                        label: "Home delivery",
                        description: "Delivered to your door",
                        icon: Truck,
                      },
                      {
                        id: "pickup" as const,
                        label: "Collection",
                        description: "Pick up from our kitchen",
                        icon: Package,
                      },
                    ] as const
                  ).map((option) => (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                        deliveryMethod === option.id
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                          : "border-surface hover:border-primary/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value={option.id}
                        checked={deliveryMethod === option.id}
                        onChange={() => setDeliveryMethod(option.id)}
                        className="mt-1 accent-primary"
                      />
                      <div>
                        <div className="flex items-center gap-2 font-semibold">
                          <option.icon className="h-4 w-4 text-secondary" />
                          {option.label}
                        </div>
                        <p className="mt-0.5 text-xs text-title/60">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>

              {deliveryMethod === "delivery" && (
                <fieldset className="rounded-2xl border border-surface bg-white p-5 shadow-sm sm:p-6">
                  <legend className="mb-5 flex items-center gap-2 px-1 text-lg font-bold">
                    <MapPin className="h-5 w-5 text-secondary" />
                    Delivery address
                  </legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="addressLine1" className="mb-1.5 block text-sm font-medium">
                        Address line 1
                      </label>
                      <input
                        id="addressLine1"
                        type="text"
                        required
                        value={form.addressLine1}
                        onChange={(e) => updateField("addressLine1", e.target.value)}
                        className={inputClassName}
                        placeholder="123 High Street"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="addressLine2" className="mb-1.5 block text-sm font-medium">
                        Address line 2 <span className="text-title/50">(optional)</span>
                      </label>
                      <input
                        id="addressLine2"
                        type="text"
                        value={form.addressLine2}
                        onChange={(e) => updateField("addressLine2", e.target.value)}
                        className={inputClassName}
                        placeholder="Flat 4"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="mb-1.5 block text-sm font-medium">
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        className={inputClassName}
                        placeholder="London"
                      />
                    </div>
                    <div>
                      <label htmlFor="postcode" className="mb-1.5 block text-sm font-medium">
                        Postcode
                      </label>
                      <input
                        id="postcode"
                        type="text"
                        required
                        value={form.postcode}
                        onChange={(e) => updateField("postcode", e.target.value)}
                        className={inputClassName}
                        placeholder="SW1A 1AA"
                      />
                    </div>
                  </div>
                </fieldset>
              )}

              <fieldset className="rounded-2xl border border-surface bg-white p-5 shadow-sm sm:p-6">
                <legend className="mb-5 px-1 text-lg font-bold">Order notes</legend>
                <label htmlFor="notes" className="sr-only">
                  Special instructions
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  className={inputClassName}
                  placeholder="Allergies, delivery instructions, or preferred delivery time..."
                />
              </fieldset>

              {submitError && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={openCart}
                  className="text-sm font-semibold text-primary transition hover:text-secondary"
                >
                  ← Back to cart
                </button>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="sm:min-w-[200px]"
                >
                  {isSubmitting ? "Redirecting to payment…" : "Pay with Stripe"}
                </Button>
              </div>
            </form>
          </Reveal>

          <Reveal className="lg:sticky lg:top-24">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              deliveryMethod={deliveryMethod}
              showItems
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
