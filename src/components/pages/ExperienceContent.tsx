"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { currentEvent } from "@/lib/events";
import { experiencePage } from "@/lib/experience";

export function ExperienceContent() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#192e22] to-primary-dark py-14 text-white sm:py-20">
        <div className="container-fluid max-w-4xl text-center">
          <Reveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              {experiencePage.eyebrow}
            </p>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">{experiencePage.title}</h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {experiencePage.intro}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/event-registration" className="!bg-secondary hover:!bg-orange">
                Register for the next event
              </Button>
              <Button
                href="/meet-abi"
                variant="outline"
                className="!border-white !text-white hover:!bg-white hover:!text-primary"
              >
                Meet Abi
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-fluid">
          <div className="grid gap-6 md:grid-cols-3">
            {experiencePage.pillars.map((pillar) => (
              <Reveal key={pillar.title} className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-bold text-title">{pillar.title}</h2>
                <p className="text-sm leading-relaxed text-title/70">{pillar.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface/30 py-12 sm:py-16">
        <div className="container-fluid max-w-3xl">
          <Reveal className="rounded-3xl border border-surface bg-white p-8 text-center shadow-sm sm:p-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              Upcoming registration
            </p>
            <h2 className="mb-3 text-2xl font-bold text-title sm:text-3xl">{currentEvent.name}</h2>
            <p className="mb-2 text-sm font-medium text-primary">{currentEvent.tagline}</p>
            <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-title/70">
              {experiencePage.registrationNote}
            </p>
            <ul className="mx-auto mb-8 max-w-md space-y-2 text-left text-sm text-title/75">
              {currentEvent.highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-secondary">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/event-registration">Register your interest</Button>
            <p className="mt-4 text-xs text-title/55">
              Prefer catering for a private group?{" "}
              <Link href="/request-a-quote" className="font-semibold text-primary hover:underline">
                Request a quote
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
