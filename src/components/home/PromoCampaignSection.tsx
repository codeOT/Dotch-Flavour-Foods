"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PromoPosterSlider } from "@/components/promo/PromoPosterSlider";
import { Reveal } from "@/components/motion/Reveal";
import { useCart } from "@/context/CartContext";
import { halfTermPromo, promoComboToCartItem, promoCombos } from "@/lib/promo";

export function PromoCampaignSection() {
  const { addItem } = useCart();
  const router = useRouter();

  return (
    <section className="relative overflow-x-clip bg-[#192e22] py-8 text-white sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#cf5c0b]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#d6b898]/15 blur-3xl" />

      <div className="container-fluid relative flex min-w-0 flex-col-reverse gap-6 sm:gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
        <Reveal className="min-w-0">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#cf5c0b] sm:text-xs sm:tracking-[0.22em]">
            {halfTermPromo.eyebrow}
          </p>
          <p className="mb-2 text-sm font-medium text-[#d6b898]">{halfTermPromo.dates}</p>
          <h2 className="mb-2 font-display text-[clamp(1.75rem,8vw,3rem)] italic leading-tight">
            {halfTermPromo.title}
          </h2>
          <p className="mb-3 text-lg text-white/90 sm:text-xl">{halfTermPromo.subtitle}</p>
          <p className="mb-6 max-w-md text-sm leading-relaxed text-white/70 sm:mb-8 sm:text-base">
            {halfTermPromo.intro}
          </p>

          <div className="mb-6 grid grid-cols-2 gap-2 sm:mb-8 sm:gap-3">
            {promoCombos.map((combo) => (
              <button
                key={combo.id}
                type="button"
                onClick={() => {
                  addItem(promoComboToCartItem(combo));
                  router.push("/shop/checkout");
                }}
                className="min-w-0 rounded-2xl border border-white/15 bg-white/5 p-3 text-left transition hover:border-[#cf5c0b] hover:bg-white/10 sm:p-4"
              >
                <p className="font-display text-2xl italic text-[#cf5c0b] sm:text-3xl">
                  {combo.priceLabel}
                </p>
                <p className="mt-1 text-xs font-semibold leading-snug sm:text-sm">
                  {combo.name.replace(/^The /, "")}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-white/60 sm:text-xs">{combo.feeds}</p>
              </button>
            ))}
          </div>

          <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={halfTermPromo.path} fullWidth className="!bg-secondary hover:!bg-orange sm:!w-auto">
              See all offers
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Button>
            <Button href={`${halfTermPromo.path}#combos`} variant="outline" fullWidth className="!border-white/35 !text-white hover:!bg-white/10 sm:!w-auto">
              Shop combos
            </Button>
          </div>
        </Reveal>

        <Reveal className="min-w-0" delay={0.08}>
          <PromoPosterSlider />
        </Reveal>
      </div>
    </section>
  );
}
