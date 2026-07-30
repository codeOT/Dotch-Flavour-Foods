"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { wholesalePage } from "@/lib/wholesale";

export function WholesaleContent() {
  return (
    <>
      <section className="bg-[#192e22] py-14 text-white sm:py-20">
        <div className="container-fluid max-w-4xl text-center">
          <Reveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              {wholesalePage.eyebrow}
            </p>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">{wholesalePage.title}</h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {wholesalePage.intro}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                href="/request-a-quote?type=wholesale"
                className="!bg-secondary hover:!bg-orange"
              >
                Submit a stockist enquiry
              </Button>
              <Button
                href="/ready-to-eat-soups"
                variant="outline"
                className="!border-white !text-white hover:!bg-white hover:!text-primary"
              >
                View Ready Soups
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-fluid">
          <Reveal className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-title sm:text-3xl">Who this is for</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {wholesalePage.fitFor.map((item) => (
              <Reveal key={item.title} className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-title">{item.title}</h3>
                <p className="text-sm leading-relaxed text-title/70">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface/30 py-12 sm:py-16">
        <div className="container-fluid max-w-3xl">
          <Reveal className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-title sm:text-3xl">How enquiries work</h2>
            <p className="mt-2 text-sm text-title/65">{wholesalePage.note}</p>
          </Reveal>
          <div className="space-y-4">
            {wholesalePage.process.map((step) => (
              <Reveal key={step.title} className="rounded-2xl border border-surface bg-white p-5">
                <p className="mb-1 text-sm font-bold text-title">{step.title}</p>
                <p className="text-sm leading-relaxed text-title/70">{step.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Button href="/request-a-quote?type=wholesale">Start wholesale enquiry</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
