"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { NewsletterSignup } from "@/components/forms/NewsletterSignup";
import { merchandisePage } from "@/lib/merchandise";

export function MerchandiseContent() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#192e22] to-primary-dark py-14 text-white sm:py-20">
        <div className="container-fluid max-w-3xl text-center">
          <Reveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              {merchandisePage.eyebrow}
            </p>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              {merchandisePage.title}
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {merchandisePage.intro}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/ready-to-eat-soups" className="!bg-secondary hover:!bg-orange">
                Shop Ready Soups
              </Button>
              <Button
                href="/shop"
                variant="outline"
                className="!border-white !text-white hover:!bg-white hover:!text-primary"
              >
                Back to Shop
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-fluid">
          <div className="grid gap-6 md:grid-cols-3">
            {merchandisePage.items.map((item) => (
              <Reveal
                key={item.title}
                className="rounded-2xl border border-dashed border-surface bg-surface/20 p-6 text-center"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary">
                  {item.status}
                </p>
                <h2 className="mb-2 text-xl font-bold text-title">{item.title}</h2>
                <p className="text-sm leading-relaxed text-title/70">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface/30 py-12 sm:py-16">
        <div className="container-fluid max-w-lg">
          <Reveal>
            <p className="mb-6 text-center text-sm text-title/70">{merchandisePage.ctaNote}</p>
            <div className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-bold text-title">Get launch updates</h2>
              <p className="mb-4 text-sm text-title/65">
                Opt in for merchandise and Ready Soups news — unsubscribe anytime.
              </p>
              <NewsletterSignup />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
