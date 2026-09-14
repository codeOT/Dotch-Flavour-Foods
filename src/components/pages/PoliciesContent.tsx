"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { policyLinks } from "@/lib/navigation";

export function PoliciesContent() {
  return (
    <section className="bg-[#f7f5f1] py-12 sm:py-16">
      <div className="container-fluid min-w-0">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
            Legal
          </p>
          <h1 className="text-3xl font-bold text-title sm:text-4xl">Policies</h1>
          <p className="mt-3 text-sm text-title/65 sm:text-base">
            Choose a document below to read the full policy.
          </p>
        </Reveal>

        <StaggerContainer className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {policyLinks.map((policy) => (
            <StaggerItem key={policy.href}>
              <Link
                href={policy.href}
                className="group flex h-full flex-col rounded-2xl border border-[#e8dfd4] bg-white p-5 transition hover:border-secondary/40 hover:shadow-sm sm:p-6"
              >
                <h2 className="text-lg font-bold text-title group-hover:text-primary">
                  {policy.label}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-title/60">
                  {policy.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
                  Read policy
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
