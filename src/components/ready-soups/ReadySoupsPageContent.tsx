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
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HoverCard } from "@/components/motion/HoverCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import {
  AnimatedListItem,
  FloatingBadge,
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
import { floatAnimation, scaleIn, slideLeft, slideRight } from "@/lib/motion";

function LaunchOfferCard({ offer }: { offer: (typeof launchOffers)[number] }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    if (!offer.code) return;
    await navigator.clipboard.writeText(offer.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <HoverCard className="h-full">
      <div className="relative h-full overflow-hidden rounded-2xl border border-surface bg-white p-6 shadow-sm">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 inline-block rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary"
        >
          {offer.badge}
        </motion.span>
        <h3 className="mb-2 text-lg font-bold">{offer.title}</h3>
        <p className="mb-4 text-sm text-title/70">{offer.description}</p>
        {offer.code && (
          <motion.button
            type="button"
            onClick={copyCode}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-lg border border-dashed border-primary/30 bg-surface/40 px-4 py-2 text-sm font-bold text-primary transition hover:bg-surface"
          >
            {offer.code}
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </motion.button>
        )}
      </div>
    </HoverCard>
  );
}

function HowItWorksCard({ step }: { step: (typeof howItWorksSteps)[number] }) {
  return (
    <HoverCard className="h-full">
      <div className="h-full rounded-2xl border border-surface bg-white p-6 shadow-sm">
        <motion.span
          className="mb-4 inline-block text-3xl font-bold text-secondary/30"
          whileHover={{ scale: 1.1, color: "#cf5c0b" }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {step.step}
        </motion.span>
        <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
        <p className="text-sm text-title/70">{step.description}</p>
      </div>
    </HoverCard>
  );
}

function ReviewCard({ review }: { review: (typeof readySoupReviews)[number] }) {
  return (
    <HoverCard className="h-full">
      <blockquote className="flex h-full flex-col rounded-2xl border border-surface bg-white p-6 shadow-sm">
        <ReviewStars rating={review.rating} />
        <p className="my-4 flex-1 text-sm leading-relaxed text-title/80">&ldquo;{review.quote}&rdquo;</p>
        <footer>
          <p className="font-semibold text-primary">{review.name}</p>
          <p className="text-xs text-title/50">{review.location}</p>
        </footer>
      </blockquote>
    </HoverCard>
  );
}

export function ReadySoupsPageContent() {
  const { openCart } = useCart();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-dark via-forest to-primary-dark py-16 text-white sm:py-24">
        <motion.div
          className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-secondary/15 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-cream/5 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="container-fluid relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal variants={slideRight}>
            <StaggerContainer className="space-y-0">
             
              <StaggerItem>
                <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">{readySoupsBrand.name}</h2>
              </StaggerItem>
              <StaggerItem>
                <p className="mb-2 text-lg font-medium text-cream">{readySoupsBrand.tagline}</p>
              </StaggerItem>
              <StaggerItem>
                <p className="mb-8 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                  {readySoupsBrand.intro}
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-wrap gap-3">
                  <Button href="#product-range">Shop the range</Button>
                  <Button
                    href="#bundles"
                    variant="outline"
                    className="!border-white !text-white hover:!bg-white hover:!text-primary"
                  >
                    View bundles
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </Reveal>

          <Reveal variants={slideLeft} delay={0.1}>
            <motion.div
              className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
              animate={floatAnimation}
            >
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <Image
                  src="/assets/images/hero dotch foods.jpg"
                  alt="Dotch Flavour Ready Soups premium frozen range"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 90vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />
                <FloatingBadge className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-widest text-cream">Each tub</p>
                  <p className="text-2xl font-bold">950ml · Serves 3–4</p>
                </FloatingBadge>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <div className="container-fluid">
          <Reveal className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">Simple process</p>
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">How it works</h2>
          </Reveal>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step) => (
              <StaggerItem key={step.step}>
                <HowItWorksCard step={step} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Product range */}
      <section id="product-range" className="scroll-mt-24 bg-surface/30 py-16 sm:py-20">
        <div className="container-fluid">
          <Reveal className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">The range</p>
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl">Frozen product range</h2>
            <p className="mx-auto max-w-2xl text-sm text-title/70 sm:text-base">
              Five authentic Nigerian soups, slow-cooked and frozen at peak freshness. Every tub is Liters.
            </p>
          </Reveal>
          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {readySoupProducts.map((product) => (
              <StaggerItem key={product.id}>
                <ReadySoupProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Storage & heating */}
      <section className="py-16 sm:py-20">
        <div className="container-fluid">
          <Reveal className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">Guidance</p>
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Storage & heating</h2>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal variants={slideRight}>
              <HoverCard>
                <div className="h-full rounded-2xl border border-surface bg-white p-6 shadow-sm sm:p-8">
                  <motion.div
                    className="mb-4 flex items-center gap-3 text-primary"
                    whileHover={{ x: 4 }}
                  >
                    <Refrigerator className="h-6 w-6 text-secondary" />
                    <h3 className="text-xl font-bold">{storageHeatingGuidance.storage.title}</h3>
                  </motion.div>
                  <StaggerContainer className="space-y-3">
                    {storageHeatingGuidance.storage.points.map((point) => (
                      <AnimatedListItem key={point} icon={Snowflake}>
                        {point}
                      </AnimatedListItem>
                    ))}
                  </StaggerContainer>
                </div>
              </HoverCard>
            </Reveal>
            <Reveal variants={slideLeft}>
              <HoverCard>
                <div className="h-full rounded-2xl border border-secondary/30 bg-secondary/5 p-6 shadow-sm sm:p-8">
                  <motion.div
                    className="mb-4 flex items-center gap-3 text-primary"
                    whileHover={{ x: 4 }}
                  >
                    <Flame className="h-6 w-6 text-secondary" />
                    <h3 className="text-xl font-bold">{storageHeatingGuidance.heating.title}</h3>
                  </motion.div>
                  <StaggerContainer className="space-y-3">
                    {storageHeatingGuidance.heating.points.map((point) => (
                      <AnimatedListItem key={point} icon={Clock}>
                        {point}
                      </AnimatedListItem>
                    ))}
                  </StaggerContainer>
                </div>
              </HoverCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bundles */}
      <section id="bundles" className="scroll-mt-24 bg-primary-dark py-16 text-white sm:py-20">
        <div className="container-fluid">
          <Reveal className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">Save more</p>
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl">Ready Soups bundles</h2>
            <p className="mx-auto max-w-2xl text-sm text-white/70">
              Curated collections for discovery, family meals, or fully stocking your freezer.
            </p>
          </Reveal>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {readySoupBundles.map((bundle) => (
              <StaggerItem key={bundle.id}>
                <ReadySoupBundleCard bundle={bundle} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Order online */}
      <section id="order" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-fluid">
          <Reveal variants={scaleIn}>
            <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-8 text-white sm:p-12">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <StaggerContainer>
                  <StaggerItem>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">Order online</p>
                  </StaggerItem>
                  <StaggerItem>
                    <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Ready when you are</h2>
                  </StaggerItem>
                  <StaggerItem>
                    <p className="mb-6 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
                      Add individual soups or bundles to your cart, choose delivery or collection at checkout,
                      and we&apos;ll prepare your frozen order with care.
                    </p>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex flex-wrap gap-4">
                      <Button type="button" onClick={openCart} variant="white">
                        View cart
                      </Button>
                      <Button
                        href="/shop/checkout"
                        variant="outline"
                        className="!border-white !text-white hover:!bg-white hover:!text-primary"
                      >
                        Checkout
                      </Button>
                    </div>
                  </StaggerItem>
                </StaggerContainer>

                <StaggerContainer className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {[
                    { icon: Package, label: "Insulated packaging" },
                    { icon: Truck, label: "UK frozen delivery" },
                    { icon: Snowflake, label: "−18°C guaranteed" },
                  ].map((item) => (
                    <StaggerItem key={item.label}>
                      <motion.div
                        whileHover={{ y: -6, scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                        className="flex flex-col items-center rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm"
                      >
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                          <item.icon className="mb-2 h-8 w-8 text-secondary" />
                        </motion.div>
                        <p className="text-xs font-semibold uppercase tracking-wide">{item.label}</p>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Launch offers */}
      <section className="bg-surface/40 py-16 sm:py-20">
        <div className="container-fluid">
          <Reveal className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">Launch</p>
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Launch offers</h2>
          </Reveal>
          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {launchOffers.map((offer) => (
              <StaggerItem key={offer.id}>
                <LaunchOfferCard offer={offer} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 sm:py-20">
        <div className="container-fluid">
          <Reveal className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">Testimonials</p>
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Customer reviews</h2>
          </Reveal>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {readySoupReviews.map((review) => (
              <StaggerItem key={review.name}>
                <ReviewCard review={review} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
