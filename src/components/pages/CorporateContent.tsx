"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { corporatePage } from "@/lib/corporate";
import { siteConfig } from "@/lib/site";

export function CorporateContent() {
  const whatsappNumber = siteConfig.contact.phone.replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Dotch Flavour Foods, I'd like to discuss corporate catering.",
  )}`;

  return (
    <>
      <section className="bg-[#192e22] py-14 text-white sm:py-20">
        <div className="container-fluid max-w-4xl text-center">
          <Reveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              {corporatePage.eyebrow}
            </p>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">{corporatePage.title}</h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {corporatePage.intro}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                href="/request-a-quote?type=corporate"
                className="!bg-secondary hover:!bg-orange"
              >
                Request a corporate quote
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
            <h2 className="text-2xl font-bold text-title sm:text-3xl">Built for the workplace</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {corporatePage.occasions.map((item) => (
              <Reveal key={item.title} className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-title">{item.title}</h3>
                <p className="text-sm leading-relaxed text-title/70">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface/30 py-12 sm:py-16">
        <div className="container-fluid">
          <div className="grid gap-4 sm:grid-cols-2">
            {corporatePage.details.map((item) => (
              <Reveal key={item.title} className="rounded-2xl border border-surface bg-white p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary">
                  {item.title}
                </p>
                <p className="text-sm leading-relaxed text-title/75">{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3 text-center">
            <Button href="/request-a-quote?type=corporate">Get a corporate quote</Button>
            <Button href="/catering" variant="outline">
              Private catering
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
