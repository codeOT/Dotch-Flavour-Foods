"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Gift, Percent, Sparkles, Truck } from "lucide-react";
import { blackFridayBundleOffers, blackFridayPromo, isBlackFridayActive } from "@/lib/black-friday";
import { Button } from "@/components/ui/Button";
import { easeOut } from "@/lib/motion";
import { formatPrice } from "@/lib/site";

const offers = [
  {
    tubs: 3 as const,
    gift: "Free wooden spoon",
    icon: Gift,
    accent: "from-[#cf5c0b] to-[#9e4122]",
  },
  {
    tubs: 4 as const,
    gift: "Free cooler bag",
    icon: Gift,
    accent: "from-[#d6b898] to-[#cf5c0b]",
  },
  {
    tubs: 5 as const,
    gift: "Cooler bag + free delivery",
    icon: Truck,
    accent: "from-[#192e22] to-[#cf5c0b]",
    featured: true,
  },
];

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const phrase = "BLACK FRIDAY · MIX ANY FLAVOUR · READY SOUPS · ";
  return (
    <div className="overflow-hidden border-y border-white/10 bg-black/20 py-2">
      <motion.div
        className="flex w-max gap-8 text-[11px] font-bold uppercase tracking-[0.35em] text-[#d6b898]/80"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <span>{phrase.repeat(4)}</span>
        <span aria-hidden>{phrase.repeat(4)}</span>
      </motion.div>
    </div>
  );
}

export function BlackFridaySection() {
  if (!isBlackFridayActive()) return null;

  return (
    <section className="relative overflow-hidden bg-[#0b1a13] text-white">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#cf5c0b]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#d6b898]/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(207,92,11,0.18),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(214,184,152,0.12),transparent_38%)]" />

      <Marquee />

      <div className="container-fluid relative py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <motion.div
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            initial={{ opacity: 0, y: 36, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <div className="absolute -left-3 top-8 hidden rotate-[-18deg] rounded-full bg-secondary px-4 py-2 text-xs font-black uppercase tracking-widest text-white shadow-lg sm:block">
              Limited
            </div>
            <motion.div
              className="absolute -right-2 top-16 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#cf5c0b] text-white shadow-xl sm:-right-4 sm:h-20 sm:w-20"
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Percent className="h-7 w-7 sm:h-8 sm:w-8" />
            </motion.div>

            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#163325] shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
              <div className="relative aspect-[4/5]">
                <Image
                  src={blackFridayPromo.poster}
                  alt={blackFridayPromo.posterAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                />
              </div>
            </div>
            <p className="mt-4 text-center text-[11px] uppercase tracking-[0.28em] text-[#d6b898]/80">
              {blackFridayPromo.dates} · Mix any 5 flavours
            </p>
          </motion.div>

          <div className="min-w-0">
            <motion.p
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d6b898]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              {/* <Sparkles className="h-3.5 w-3.5 text-secondary" /> */}
              {blackFridayPromo.eyebrow}
            </motion.p>

            <motion.h2
              className="mb-4 font-display text-[clamp(3rem,10vw,6.5rem)] italic leading-[0.82] text-white"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              Black
              <span className="block text-secondary">Friday.</span>
            </motion.h2>

            <motion.p
              className="mb-8 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1, ease: easeOut }}
            >
              {blackFridayPromo.intro}
            </motion.p>

            <div className="mb-8 grid gap-3 sm:grid-cols-3">
              {offers.map((offer, index) => {
                const deal = blackFridayBundleOffers[offer.tubs];
                const Icon = offer.icon;
                return (
                  <motion.a
                    key={offer.tubs}
                    href={blackFridayPromo.path}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-lg backdrop-blur-sm transition hover:-translate-y-1 hover:border-secondary/50 ${
                      offer.featured ? "ring-1 ring-secondary/70" : ""
                    }`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.12 * index, ease: easeOut }}
                  >
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${offer.accent}`} />
                    {offer.featured && (
                      <span className="mb-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                        Best value
                      </span>
                    )}
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#d6b898]">
                      {offer.tubs} tubs
                    </p>
                    <p className="mt-1 text-2xl font-black text-white">{formatPrice(deal.price)}</p>
                    <p className="text-xs text-white/40 line-through">
                      {formatPrice(deal.originalPrice)}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-secondary">{deal.badge}</p>
                    <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-snug text-white/75">
                      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
                      {offer.gift}
                    </p>
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
            >
              <Button href={blackFridayPromo.path} className="!bg-secondary hover:!bg-orange">
                Shop the bundles
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-xs text-white/55 sm:max-w-[16rem]">
                Individual tubs stay {formatPrice(25.99)}. Delivery is included only with the 5-tub
                bundle.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <Marquee reverse />
    </section>
  );
}
