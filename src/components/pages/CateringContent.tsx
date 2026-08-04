"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { cateringPage } from "@/lib/catering";
import { siteConfig } from "@/lib/site";

export function CateringContent() {
  const whatsappNumber = siteConfig.contact.phone.replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Dotch Flavour Foods, I'd like to discuss a catering booking.",
  )}`;

  return (
    <>
      <section className="bg-[#192e22] py-14 text-white sm:py-20">
        <div className="container-fluid max-w-4xl text-center">
          <Reveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              {cateringPage.eyebrow}
            </p>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">{cateringPage.title}</h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {cateringPage.intro}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/request-a-quote?type=catering" className="!bg-secondary hover:!bg-orange">
                Request a catering quote
              </Button>
              <Button
                href="/corporate"
                variant="outline"
                className="!border-white !text-white hover:!bg-white hover:!text-primary"
              >
                Corporate catering
              </Button>
              <Button
                href={whatsappHref}
                variant="outline"
                className="!border-white !text-white hover:!bg-white hover:!text-primary"
              >
                WhatsApp us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-fluid">
          <Reveal className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-title sm:text-3xl">Service types</h2>
            <p className="mt-2 text-sm text-title/65">Tell us the occasion — we&apos;ll shape the menu.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {cateringPage.serviceTypes.map((service) => (
              <Reveal key={service.title} className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-title">{service.title}</h3>
                <p className="text-sm leading-relaxed text-title/70">{service.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface/30 py-12 sm:py-16">
        <div className="container-fluid">
          <Reveal className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-title sm:text-3xl">How catering works</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {cateringPage.details.map((item) => (
              <Reveal key={item.title} className="rounded-2xl border border-surface bg-white p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary">
                  {item.title}
                </p>
                <p className="text-sm leading-relaxed text-title/75">{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3 text-center">
            <Button href="/request-a-quote">Start your quote</Button>
            <Button href="/catering-booking-policy" variant="outline">
              Catering booking policy
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
