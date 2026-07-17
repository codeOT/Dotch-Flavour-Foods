"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Clock,
  Copy,
  Flame,
  Package,
  Refrigerator,
  Snowflake,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  ReadySoupBundleCard,
  ReadySoupProductCard,
  ReviewStars,
} from "@/components/ready-soups/ReadySoupCards";
import {
  howItWorksSteps,
  launchOffers,
  readySoupBundles,
  readySoupProducts,
  readySoupReviews,
  readySoupsBrand,
  storageHeatingGuidance,
} from "@/lib/ready-soups";
import { useCart } from "@/context/CartContext";

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-8 text-center sm:mb-10">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">{eyebrow}</p>
      <h2 className={`text-2xl font-bold sm:text-3xl md:text-4xl ${light ? "text-white" : ""}`}>
        {title}
      </h2>
      {description && (
        <p
          className={`mx-auto mt-3 max-w-2xl text-sm sm:text-base ${
            light ? "text-white/70" : "text-title/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function LaunchOfferCard({ offer }: { offer: (typeof launchOffers)[number] }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    if (!offer.code) return;
    await navigator.clipboard.writeText(offer.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full rounded-2xl border border-surface bg-white p-6 shadow-sm">
      <span className="mb-3 inline-block rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary">
        {offer.badge}
      </span>
      <h3 className="mb-2 text-lg font-bold">{offer.title}</h3>
      <p className="mb-4 text-sm text-title/70">{offer.description}</p>
      {offer.code && (
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-2 rounded-lg border border-dashed border-primary/30 bg-surface/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-surface"
        >
          {offer.code}
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );
}

function HowItWorksCard({ step }: { step: (typeof howItWorksSteps)[number] }) {
  return (
    <div className="h-full rounded-2xl border border-surface bg-white p-6 shadow-sm">
      <span className="mb-4 inline-block text-3xl font-bold text-secondary/30">{step.step}</span>
      <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
      <p className="text-sm text-title/70">{step.description}</p>
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof readySoupReviews)[number] }) {
  return (
    <blockquote className="flex h-full flex-col rounded-2xl border border-surface bg-white p-6 shadow-sm">
      <ReviewStars rating={review.rating} />
      <p className="my-4 flex-1 text-sm leading-relaxed text-title/80">&ldquo;{review.quote}&rdquo;</p>
      <footer>
        <p className="font-semibold text-primary">{review.name}</p>
        <p className="text-xs text-title/50">{review.location}</p>
      </footer>
    </blockquote>
  );
}

function GuidanceCard({
  title,
  points,
  icon: Icon,
  listIcon: ListIcon,
  variant = "default",
}: {
  title: string;
  points: readonly string[];
  icon: React.ComponentType<{ className?: string }>;
  listIcon: React.ComponentType<{ className?: string }>;
  variant?: "default" | "accent";
}) {
  return (
    <div
      className={`h-full min-w-0 rounded-2xl border p-5 shadow-sm sm:p-8 ${
        variant === "accent"
          ? "border-secondary/30 bg-secondary/5"
          : "border-surface bg-white"
      }`}
    >
      <div className="mb-4 flex min-w-0 items-start gap-3">
        <Icon className="mt-0.5 h-6 w-6 shrink-0 text-secondary" />
        <h3 className="min-w-0 text-lg font-bold leading-snug sm:text-xl">{title}</h3>
      </div>
      <ul className="space-y-3">
        {points.map((point) => (
          <li key={point} className="flex min-w-0 gap-3 text-sm leading-relaxed text-title/80">
            <ListIcon className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <span className="min-w-0 flex-1 break-words">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReadySoupsPageContent() {
  const { openCart } = useCart();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-x-clip bg-gradient-to-b from-primary-dark via-forest to-primary-dark py-10 text-white sm:py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-secondary/15 blur-3xl sm:h-80 sm:w-80" />

        <div className="container-fluid relative min-w-0">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="order-2 min-w-0 lg:order-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                {readySoupsBrand.parent}
              </p>
              <h1 className="mb-3 text-balance text-[clamp(1.65rem,6.5vw,3rem)] font-bold leading-tight sm:mb-4 sm:text-4xl lg:text-5xl">
                {readySoupsBrand.name}
              </h1>
              <p className="mb-3 text-sm font-medium leading-snug text-cream sm:text-base lg:text-lg">
                {readySoupsBrand.tagline}
              </p>
              <p className="mb-6 max-w-xl text-sm leading-relaxed text-white/75 sm:mb-8 sm:text-base">
                {readySoupsBrand.intro}
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                <Button href="#product-range" fullWidth className="sm:w-auto">
                  Shop the range
                </Button>
                <Button
                  href="#bundles"
                  variant="outline"
                  fullWidth
                  className="sm:w-auto !border-white !text-white hover:!bg-white hover:!text-primary"
                >
                  View bundles
                </Button>
              </div>
            </div>

            <div className="order-1 min-w-0 lg:order-2">
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:aspect-[5/4] lg:aspect-square lg:rounded-3xl">
                  <Image
                    src="/assets/images/Egus.png"
                    alt="Dotch Flavour Ready Soups premium frozen range"
                    fill
                    className="object-cover"
                    priority
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/10 p-3 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-cream sm:text-xs">
                      Each tub
                    </p>
                    <p className="text-lg font-bold sm:text-2xl">2000ml · Serves 3–4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-20">
        <div className="container-fluid min-w-0">
          <SectionHeading eyebrow="Simple process" title="How it works" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step) => (
              <HowItWorksCard key={step.step} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* Product range */}
      <section id="product-range" className="scroll-mt-24 bg-surface/30 py-12 sm:py-20">
        <div className="container-fluid min-w-0">
          <SectionHeading
            eyebrow="The range"
            title="Frozen product range"
            description="Five authentic Nigerian soups, slow-cooked and frozen at peak freshness. Every tub is 1000ml."
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {readySoupProducts.map((product, index) => (
              <ReadySoupProductCard
                key={product.id}
                product={product}
                priority={index < 2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Storage & heating */}
      <section className="overflow-x-clip py-12 sm:py-20">
        <div className="container-fluid min-w-0">
          <SectionHeading eyebrow="Guidance" title="Storage & heating" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <GuidanceCard
              title={storageHeatingGuidance.storage.title}
              points={storageHeatingGuidance.storage.points}
              icon={Refrigerator}
              listIcon={Snowflake}
            />
            <GuidanceCard
              title={storageHeatingGuidance.heating.title}
              points={storageHeatingGuidance.heating.points}
              icon={Flame}
              listIcon={Clock}
              variant="accent"
            />
          </div>
        </div>
      </section>

      {/* Bundles */}
      <section id="bundles" className="scroll-mt-24 bg-primary-dark py-12 text-white sm:py-20">
        <div className="container-fluid min-w-0">
          <SectionHeading
            eyebrow="Save more"
            title="Ready Soups bundles"
            description="Curated collections for discovery, family meals, or fully stocking your freezer."
            light
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {readySoupBundles.map((bundle) => (
              <ReadySoupBundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </div>
      </section>

      {/* Order online */}
      <section id="order" className="scroll-mt-24 overflow-x-clip py-12 sm:py-20">
        <div className="container-fluid min-w-0">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-6 text-white sm:rounded-3xl sm:p-10 lg:p-12">
            <div className="flex flex-col gap-8">
              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
                  Order online
                </p>
                <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">Ready when you are</h2>
                <p className="mb-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
                  Add individual soups or bundles to your cart, choose delivery or collection at checkout,
                  and we&apos;ll prepare your frozen order with care.
                </p>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                  <Button type="button" onClick={openCart} variant="white" fullWidth className="sm:w-auto">
                    View cart
                  </Button>
                  <Button
                    href="/shop/checkout"
                    variant="outline"
                    fullWidth
                    className="sm:w-auto !border-white !text-white hover:!bg-white hover:!text-primary"
                  >
                    Checkout
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: Package, label: "Insulated packaging" },
                  { icon: Truck, label: "UK frozen delivery" },
                  { icon: Snowflake, label: "−18°C guaranteed" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl bg-white/10 p-4 sm:flex-col sm:items-center sm:text-center"
                  >
                    <item.icon className="h-7 w-7 shrink-0 text-secondary sm:mb-1 sm:h-8 sm:w-8" />
                    <p className="text-xs font-semibold uppercase tracking-wide">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Launch offers */}
      <section className="bg-surface/40 py-12 sm:py-20">
        <div className="container-fluid min-w-0">
          <SectionHeading eyebrow="Launch" title="Launch offers" />
          <div className="grid gap-6 md:grid-cols-2">
            {launchOffers.map((offer) => (
              <LaunchOfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 sm:py-20">
        <div className="container-fluid min-w-0">
          <SectionHeading eyebrow="Testimonials" title="Customer reviews" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {readySoupReviews.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
