"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { siteConfig } from "@/lib/site";

export function CateringCtaSection() {
  return (
    <section className="w-full min-w-0 overflow-x-clip py-12 sm:py-16">
      <div className="container-fluid min-w-0">
        <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-3">
          <Reveal className="min-w-0 lg:col-span-2">
            <StaggerContainer className="space-y-0">
              <StaggerItem>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
                  Catering
                </p>
              </StaggerItem>
              <StaggerItem>
                <h2 className="mb-3 text-[clamp(1.35rem,5vw,1.875rem)] font-bold text-title sm:text-3xl">
                  Hosting? Let Dotch Flavour feed the table
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="mb-6 max-w-xl text-sm leading-relaxed text-title/70 sm:text-base">
                  Private celebrations, office lunches, and tasting moments — planned with the same
                  care as every Ready Soup. Tell us the occasion and we&apos;ll send a clear quote.
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button href="/request-a-quote" fullWidth className="sm:!w-auto">
                    Request a catering quote
                  </Button>
                  <Button href="/catering" variant="outline" fullWidth className="sm:!w-auto">
                    Explore catering
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </Reveal>

          <Reveal className="min-w-0">
            <aside className="rounded-2xl bg-forest p-5 text-white sm:p-8">
              <h3 className="mb-2 text-xl font-semibold">Contact</h3>
              <p className="mb-6 text-sm text-white/80">
                Prefer to talk it through? Reach us directly — we typically reply within 1–2 working
                days.
              </p>
              <div className="space-y-5 text-sm">
                {[
                  { icon: MapPin, text: siteConfig.contact.address },
                  { icon: Phone, text: siteConfig.contact.phone },
                  { icon: Mail, text: siteConfig.contact.email },
                ].map((item) => (
                  <div key={item.text} className="flex min-w-0 gap-3">
                    <item.icon className="mt-1 h-5 w-5 shrink-0" />
                    <span className="min-w-0 break-words">{item.text}</span>
                  </div>
                ))}
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
