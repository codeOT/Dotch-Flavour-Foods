"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

const shopChannels = [
  {
    title: "Ready Soups by Dotch Flavour",
    description:
      "Our premium frozen soup range — mix flavours in 3, 5, 10, or 18 packs. Delivery £13.99 up to 20kg / £16.99 up to 25kg. Next-day delivery: order Monday–Thursday 8am–3pm; Friday–Sunday orders arrive Tuesday.",
    href: "/ready-to-eat-soups",
    cta: "Shop Ready Soups",
    image: "/assets/images/hero-bg.png",
    badge: "Available now",
  },
  {
    title: "Merchandise",
    description:
      "Tote bags, wooden spoons, and branded goods — launching as incentives first, then as a full retail range.",
    href: "/merchandise",
    cta: "View coming soon",
    image: "/assets/images/gallery/grid/pic3.jpg",
    badge: "Coming soon",
  },
] as const;

export function ShopContent() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-fluid">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">Shop</p>
          <h1 className="text-3xl font-bold text-title sm:text-4xl">Choose your Dotch Flavour route</h1>
          <p className="mt-3 text-sm text-title/70 sm:text-base">
            Ready Soups are available online now. Merchandise is on the way — Fresh Menu orders stay
            on their dedicated page.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {shopChannels.map((channel) => (
            <Reveal key={channel.title}>
              <Link
                href={channel.href}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-surface bg-white shadow-sm transition hover:border-primary/25 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={channel.image}
                    alt={channel.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    {channel.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h2 className="mb-2 text-xl font-bold text-title sm:text-2xl">{channel.title}</h2>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-title/70">
                    {channel.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {channel.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="mb-4 text-sm text-title/65">Looking for weekly fresh dishes?</p>
          <Button href="/fresh-menu" variant="outline">
            Order from Fresh Menu
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
