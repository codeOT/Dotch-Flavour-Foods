"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { scaleIn, slideRight } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

export function CateringCtaSection() {
  return (
    <section className="overflow-hidden py-12 sm:py-16">
      <div className="container-fluid min-w-0">
        <div className="grid min-w-0 gap-8 lg:grid-cols-3">
          <Reveal variants={slideRight} className="lg:col-span-2">
            <StaggerContainer className="space-y-0">
              <StaggerItem>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
                  Catering
                </p>
              </StaggerItem>
              <StaggerItem>
                <h2 className="mb-3 text-2xl font-bold text-title sm:text-3xl">
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
                <div className="flex flex-wrap gap-3">
                  <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button href="/request-a-quote">Request a catering quote</Button>
                  </motion.div>
                  <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button href="/catering" variant="outline">
                      Explore catering
                    </Button>
                  </motion.div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </Reveal>

          <Reveal variants={scaleIn}>
            <motion.aside
              className="rounded-2xl bg-forest p-5 text-white sm:p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="mb-2 text-xl font-semibold">Contact</h3>
              <p className="mb-6 text-sm text-white/80">
                Prefer to talk it through? Reach us directly — we typically reply within 1–2 working
                days.
              </p>
              <StaggerContainer className="space-y-5 text-sm">
                {[
                  { icon: MapPin, text: siteConfig.contact.address },
                  { icon: Phone, text: siteConfig.contact.phone },
                  { icon: Mail, text: siteConfig.contact.email },
                ].map((item) => (
                  <StaggerItem key={item.text}>
                    <motion.div className="flex gap-3" whileHover={{ x: 4 }}>
                      <item.icon className="mt-1 h-5 w-5 shrink-0" />
                      <span className="whitespace-pre-line">{item.text}</span>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
