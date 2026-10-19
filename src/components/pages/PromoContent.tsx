"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PromoPosterSlider } from "@/components/promo/PromoPosterSlider";
import { OrderComboButton } from "@/components/promo/OrderComboButton";
import { Reveal } from "@/components/motion/Reveal";
import { halfTermPromo, promoCombos } from "@/lib/promo";

export function PromoContent() {
  return (
    <>
      <section className="relative overflow-x-clip bg-gradient-to-b from-[#192e22] to-primary-dark py-10 text-white sm:py-16 lg:py-20">
        <div className="container-fluid max-w-3xl text-center">
          <Reveal>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary sm:text-xs sm:tracking-[0.22em]">
              {halfTermPromo.eyebrow}
            </p>
            <p className="mb-3 text-sm font-medium text-[#d6b898] sm:mb-4">{halfTermPromo.dates}</p>
            <h1 className="mb-3 font-display text-[clamp(2rem,10vw,3.75rem)] italic leading-tight">
              {halfTermPromo.title}
            </h1>
            <p className="mb-4 text-xl text-white/90 sm:text-2xl">{halfTermPromo.subtitle}</p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {halfTermPromo.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="overflow-x-clip bg-[#faf7f2] py-8 sm:py-14">
        <div className="container-fluid grid min-w-0 items-center gap-6 sm:gap-10 lg:grid-cols-2">
          <Reveal className="min-w-0">
            <PromoPosterSlider />
          </Reveal>
          <Reveal className="min-w-0">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              This half-term
            </p>
            <h2 className="mb-4 font-display text-3xl italic text-title sm:text-4xl">
              Make it delicious
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-title/70 sm:text-base">
              Choose a family combo for sharing, or stock the freezer with Ready Soups. Add a combo
              and pay at checkout. Delivery is a flat rate of £19.99.
            </p>
            <ul className="space-y-3 text-sm text-title/75">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                £99 and £129 sharing combos with jollof, protein, plantain and a drink
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                Mix & match Ready Soups online — minimum 3 tubs, delivery £19.99
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                Campaign runs {halfTermPromo.dates}
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="combos" className="scroll-mt-24 overflow-x-clip bg-white py-8 sm:py-16">
        <div className="container-fluid min-w-0">
          <Reveal className="mb-6 text-center sm:mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              Sharing combos
            </p>
            <h2 className="text-2xl font-bold text-title sm:text-3xl">Feed the table</h2>
          </Reveal>

          <div className="grid min-w-0 gap-5 sm:gap-6 lg:grid-cols-2">
            {promoCombos.map((combo) => (
              <Reveal
                key={combo.id}
                className="min-w-0 overflow-hidden rounded-2xl border border-surface bg-white shadow-sm sm:rounded-3xl"
              >
                <div className="flex max-h-[min(52vh,22rem)] items-center justify-center bg-[#faf7f2] sm:max-h-[min(56vh,28rem)]">
                  <Image
                    src={combo.image}
                    alt={combo.name}
                    width={1080}
                    height={1350}
                    sizes="(max-width: 1024px) 92vw, 48vw"
                    className="max-h-[min(52vh,22rem)] w-auto max-w-full object-contain sm:max-h-[min(56vh,28rem)]"
                  />
                </div>
                <div className="p-4 sm:p-8">
                  <p className="font-display text-3xl italic text-secondary sm:text-4xl">
                    {combo.priceLabel}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-title sm:text-2xl">{combo.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{combo.feeds}</p>
                  <ul className="mt-4 space-y-2 text-sm text-title/75 sm:mt-5">
                    {combo.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-secondary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 sm:mt-6">
                    <OrderComboButton combo={combo} label="Checkout" fullWidth />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-x-clip bg-[#192e22] py-8 text-white sm:py-16">
        <div className="container-fluid grid min-w-0 items-center gap-6 sm:gap-10 lg:grid-cols-2">
          <Reveal className="min-w-0">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              Ready Soups
            </p>
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Authentic flavour, ready for you</h2>
            <p className="mb-6 text-sm leading-relaxed text-white/75 sm:text-base">
              Mix Efo Riro, Efo Egusi, Ayamase, Buka Stew and Ila Asepo. Online orders are a minimum
              of 3 tubs. Delivery is a flat rate of £19.99.
            </p>
            <Button
              href="/ready-to-eat-soups#bundles"
              fullWidth
              className="!bg-secondary hover:!bg-orange sm:!w-auto"
            >
              Shop Ready Soups
            </Button>
          </Reveal>
          <Reveal className="min-w-0 overflow-hidden rounded-2xl bg-white sm:rounded-3xl">
            <Image
              src="/assets/images/promo/ready-soups.jpg"
              alt="Five Ready Soups tubs in the half-term campaign"
              width={1080}
              height={1350}
              className="h-auto max-h-[min(58vh,28rem)] w-full object-contain"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-0 py-8 text-center sm:py-12">
        <div className="container-fluid">
          <p className="text-xs leading-relaxed text-title/55">
            Combos are subject to availability during {halfTermPromo.dates}. Complimentary drink
            options are confirmed when you order. Ready Soups checkout prices and the £19.99
            delivery fee apply online.{" "}
            <Link href="/terms" className="font-semibold text-primary hover:underline">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
