"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Snowflake } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { siteConfig } from "@/lib/site";
import { floatAnimation } from "@/lib/motion";

const perks = [
  "Track orders and delivery in one place",
  "Save favourites from Ready Soups & more",
  "Exclusive launch offers and bundle deals",
];

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkHref: string;
  footerLinkLabel: string;
};

export function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkHref,
  footerLinkLabel,
}: AuthLayoutProps) {
  return (
    <section className="min-h-screen">
      <div className="grid min-h-[inherit] lg:grid-cols-2">
        {/* Brand panel */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-forest to-primary px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
          <motion.div
            className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
            animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <Reveal className="relative z-10">
            <Link href="/" className="mb-8 inline-block">
              <Image
                src="/assets/images/dotchbg.png"
                alt={siteConfig.name}
                width={280}
                height={48}
                className="h-9 w-auto brightness-0 invert sm:h-10"
              />
            </Link>

            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-cream">
              <Snowflake className="h-3 w-3" />
              {siteConfig.name}
            </p>
            <h1 className="mb-4 max-w-md text-3xl font-bold leading-tight sm:text-4xl">
              Authentic flavours, thoughtfully prepared.
            </h1>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-white/75 sm:text-base">
              Join Dotch Flavours Foods to order ready-to-eat soups, sauces, and stews with
              faster checkout and order history.
            </p>

            <StaggerContainer className="mb-10 hidden space-y-3 sm:block">
              {perks.map((perk) => (
                <StaggerItem key={perk}>
                  <div className="flex items-start gap-3 text-sm text-white/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/90">
                      <Check className="h-3 w-3" />
                    </span>
                    {perk}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Reveal>

          <motion.div
            animate={floatAnimation}
            className="relative z-10 mx-auto hidden max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:block"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/assets/images/gallery/grid2/pic5.jpg"
                alt="Dotch Flavours Foods"
                fill
                className="object-cover"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white/90">
                Ready Soups · 950ml · Frozen fresh
              </p>
            </div>
          </motion.div>
        </div>

        {/* Form panel */}
        <div className="flex items-center justify-center bg-surface/20 px-6 py-12 sm:px-10 lg:px-14">
          <Reveal className="w-full max-w-md">
            <div className="mb-8">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-secondary">
                Account
              </p>
              <h2 className="text-2xl font-bold text-title sm:text-3xl">{title}</h2>
              <p className="mt-2 text-sm text-title/70">{subtitle}</p>
            </div>

            {children}

            <p className="mt-8 text-center text-sm text-title/70">
              {footerText}{" "}
              <Link
                href={footerLinkHref}
                className="font-semibold text-primary transition hover:text-secondary"
              >
                {footerLinkLabel}
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const inputClassName =
  "w-full rounded-xl border border-surface bg-white px-4 py-3 text-sm text-title outline-none transition placeholder:text-title/40 focus:border-primary focus:ring-2 focus:ring-primary/15";

export function AuthField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <StaggerItem>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-title">
        {label}
      </label>
      <motion.input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputClassName}
        whileFocus={{ scale: 1.01 }}
      />
    </StaggerItem>
  );
}
