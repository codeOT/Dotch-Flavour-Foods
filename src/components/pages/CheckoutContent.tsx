"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

import {
  cartHasReadySoups,
  getReadySoupUnitCount,
  meetsReadySoupMinimum,
  READY_SOUP_MIN_ORDER,
} from "@/lib/cart-utils";

import { siteConfig } from "@/lib/site";

import {
  CHECKOUT_IDEMPOTENCY_HEADER,
  clearCheckoutIdempotencyKey,
  getOrCreateCheckoutIdempotencyKey,
} from "@/lib/checkout-idempotency";

import Link from "next/link";

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
  "w-full min-w-0 rounded-lg border border-surface bg-white px-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20";



function CheckoutSteps({
  current,
  onOpenCart,
}: {
  current: 1 | 2 | 3;
  onOpenCart: () => void;
}) {
  const steps = [
    { num: 1 as const, label: "Cart", action: onOpenCart },
    { num: 2 as const, label: "Checkout" },
    { num: 3 as const, label: "Confirmation" },
  ];

  return (
    <nav aria-label="Checkout progress" className="mb-8 sm:mb-10">
      <ol className="flex items-center justify-center gap-1.5 sm:gap-4">
        {steps.map((step, index) => {
          const isComplete = step.num < current;
          const isCurrent = step.num === current;

          return (
            <li
              key={step.label}
              className="flex min-w-0 items-center gap-1.5 sm:gap-4"
            >
              {"action" in step && isComplete ? (
                <button
                  type="button"
                  onClick={step.action}
                  className="flex items-center gap-1.5 text-sm font-medium text-primary transition hover:text-secondary sm:gap-2"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white sm:h-8 sm:w-8 sm:text-xs">
                    {step.num}
                  </span>

                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              ) : (
                <span
                  className={`flex items-center gap-1.5 text-sm font-medium sm:gap-2 ${
                    isCurrent
                      ? "text-primary"
                      : isComplete
                        ? "text-primary/70"
                        : "text-title/40"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold sm:h-8 sm:w-8 sm:text-xs ${
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
                <span
                  className="h-px w-5 bg-surface sm:w-8 lg:w-12"
                  aria-hidden
                />
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

  useEffect(() => {
    if (cancelled) {
      clearCheckoutIdempotencyKey();
    }
  }, [cancelled]);



  const updateField = (field: keyof CheckoutForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitError("");

    if (!meetsReadySoupMinimum(items)) {
      const count = getReadySoupUnitCount(items);

      setSubmitError(
        `Ready Soups online orders require at least ${READY_SOUP_MIN_ORDER} soups. You currently have ${count}.`,
      );

      setIsSubmitting(false);
      return;
    }

    try {
      const checkoutPayload = {
        items,
        deliveryMethod: "delivery" as const,
        ...form,
      };

      const idempotencyKey =
        getOrCreateCheckoutIdempotencyKey(checkoutPayload);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [CHECKOUT_IDEMPOTENCY_HEADER]: idempotencyKey,
        },
        body: JSON.stringify(checkoutPayload),
      });

      const data = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !data.url) {
        setSubmitError(
          data.error ?? "Unable to start checkout. Please try again.",
        );

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
      <section className="overflow-hidden py-10 sm:py-16">
        <div className="container-fluid">
          <div className="h-72 animate-pulse rounded-2xl bg-surface/40 sm:h-96" />
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  const readySoupUnits = getReadySoupUnitCount(items);

  const showReadySoupWarning =
    cartHasReadySoups(items) && !meetsReadySoupMinimum(items);



  return (
    <section className="overflow-hidden py-8 sm:py-12 lg:py-16">
      <div className="container-fluid">
        {/* Checkout progress */}
        <CheckoutSteps current={2} onOpenCart={openCart} />

        {/* Cancelled payment message */}
        {cancelled && (
          <p className="mb-5 rounded-xl border border-secondary/30 bg-secondary/5 px-4 py-3 text-center text-sm leading-6 text-title sm:mb-6">
            Payment was cancelled. You can review your details and try again.
          </p>
        )}

        {/* Guest checkout */}
        <p className="mb-5 rounded-xl border border-surface bg-surface/30 px-4 py-3 text-sm leading-6 text-title/80 sm:mb-6">
          Guest checkout is available — no account required. Prefer to save
          your details?{" "}
          <Link
            href="/sign-in?callbackUrl=/shop/checkout"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>{" "}
          or{" "}
          <Link
            href="/sign-up?callbackUrl=/shop/checkout"
            className="font-semibold text-primary hover:underline"
          >
            create an account
          </Link>
          .
        </p>

        {/* Ready soup warning */}
        {showReadySoupWarning && (
          <p className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 sm:mb-6">
            Ready Soups need at least {READY_SOUP_MIN_ORDER} soups online. You
            have {readySoupUnits}.{" "}
            <Link
              href="/ready-to-eat-soups#bundles"
              className="font-semibold underline"
            >
              Build a mix &amp; match bundle
            </Link>
            .
          </p>
        )}

     

        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,1fr)_24rem]">
       

          <Reveal className="min-w-0">
            <form onSubmit={handleSubmit} className="min-w-0 space-y-5 sm:space-y-8">
             

              <fieldset className="min-w-0 rounded-2xl border border-surface bg-white p-4 shadow-sm sm:p-6">
                <legend className="mb-4 px-1 text-lg font-bold sm:mb-5">
                  Contact details
                </legend>

                <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                  {/* Full name */}
                  <div className="min-w-0 sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Full name
                    </label>

                    <input
                      id="fullName"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) =>
                        updateField("fullName", e.target.value)
                      }
                      className={inputClassName}
                      placeholder="Name"
                      autoComplete="name"
                    />
                  </div>

                  {/* Email */}
                  <div className="min-w-0">
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        updateField("email", e.target.value)
                      }
                      className={inputClassName}
                      placeholder={siteConfig.contact.email}
                      autoComplete="email"
                      inputMode="email"
                    />
                  </div>

                  {/* Phone */}
                  <div className="min-w-0">
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Phone
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        updateField("phone", e.target.value)
                      }
                      className={inputClassName}
                      placeholder="+447700900123"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset className="min-w-0 rounded-2xl border border-surface bg-white p-4 shadow-sm sm:p-6">
                <legend className="mb-4 flex items-center gap-2 px-1 text-lg font-bold sm:mb-5">
                  <MapPin className="h-5 w-5 shrink-0 text-secondary" />

                  <span>Delivery address</span>
                </legend>

                  <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                    {/* Address line 1 */}
                    <div className="min-w-0 sm:col-span-2">
                      <label
                        htmlFor="addressLine1"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Address line 1
                      </label>

                      <input
                        id="addressLine1"
                        type="text"
                        required
                        value={form.addressLine1}
                        onChange={(e) =>
                          updateField("addressLine1", e.target.value)
                        }
                        className={inputClassName}
                        placeholder="123 High Street"
                        autoComplete="address-line1"
                      />
                    </div>

                    {/* Address line 2 */}
                    <div className="min-w-0 sm:col-span-2">
                      <label
                        htmlFor="addressLine2"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Address line 2{" "}
                        <span className="text-title/50">(optional)</span>
                      </label>

                      <input
                        id="addressLine2"
                        type="text"
                        value={form.addressLine2}
                        onChange={(e) =>
                          updateField("addressLine2", e.target.value)
                        }
                        className={inputClassName}
                        placeholder="Flat 4"
                        autoComplete="address-line2"
                      />
                    </div>

                    {/* City */}
                    <div className="min-w-0">
                      <label
                        htmlFor="city"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        City
                      </label>

                      <input
                        id="city"
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) =>
                          updateField("city", e.target.value)
                        }
                        className={inputClassName}
                        placeholder="London"
                        autoComplete="address-level2"
                      />
                    </div>

                    {/* Postcode */}
                    <div className="min-w-0">
                      <label
                        htmlFor="postcode"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Postcode
                      </label>

                      <input
                        id="postcode"
                        type="text"
                        required
                        value={form.postcode}
                        onChange={(e) =>
                          updateField("postcode", e.target.value)
                        }
                        className={inputClassName}
                        placeholder="SW1A 1AA"
                        autoComplete="postal-code"
                      />
                    </div>
                  </div>
                </fieldset>

              

              <fieldset className="min-w-0 rounded-2xl border border-surface bg-white p-4 shadow-sm sm:p-6">
                <legend className="mb-4 px-1 text-lg font-bold sm:mb-5">
                  Order notes
                </legend>

                <label htmlFor="notes" className="sr-only">
                  Special instructions
                </label>

                <textarea
                  id="notes"
                  rows={4}
                  value={form.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  className={`${inputClassName} resize-y`}
                  placeholder="Allergies, delivery instructions, or preferred delivery time..."
                />
              </fieldset>

          

              {submitError && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                  {submitError}
                </p>
              )}

         

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={openCart}
                  className="w-full py-2 text-sm font-semibold text-primary transition hover:text-secondary sm:w-auto"
                >
                  ← Back to cart
                </button>

                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto sm:min-w-[200px]"
                >
                  {isSubmitting
                    ? "Redirecting to payment…"
                    : "Pay with Stripe"}
                </Button>
              </div>
            </form>
          </Reveal>


          <Reveal className="min-w-0 lg:sticky lg:top-24">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              deliveryMethod="delivery"
              showItems
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}