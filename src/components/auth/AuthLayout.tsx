"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { siteConfig } from "@/lib/site";
import { easeOut } from "@/lib/motion";

const perks = [
  "Order Ready Soups and track deliveries",
  "Faster checkout with saved details",
  "Be first to hear about launches and offers",
];

export const authInputClassName =
  "w-full rounded-2xl border border-title/10 bg-[#f7f5f1] px-4 py-3.5 text-sm text-title outline-none transition placeholder:text-title/35 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
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
    <section className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Visual panel */}
        <div className="relative hidden overflow-hidden lg:block">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: easeOut }}
          >
            <Image
              src="/assets/images/Efo Riro.jpg"
              alt="Dotch Flavour Ready Soup"
              fill
              priority
              className="object-cover"
              sizes="50vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1612] via-[#0d1612]/55 to-[#0d1612]/25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(207,92,11,0.25),transparent_45%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
            <Link href="/" className="inline-flex w-fit">
              <Image
                src="/assets/images/dotchbg.png"
                alt={siteConfig.name}
                width={280}
                height={48}
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>

            <div className="max-w-md text-white">
              <motion.p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-secondary"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5, ease: easeOut }}
              >
                Dotch Flavour
              </motion.p>
              <motion.h1
                className="mb-4 font-display text-4xl font-medium leading-tight xl:text-5xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.55, ease: easeOut }}
              >
                Taste of home, ready when you are.
              </motion.h1>
              <motion.p
                className="mb-8 text-sm leading-relaxed text-white/75 xl:text-base"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.55, ease: easeOut }}
              >
                Create an account to shop Ready Soups, save your details, and keep every order in one
                place.
              </motion.p>

              <StaggerContainer className="space-y-3">
                {perks.map((perk) => (
                  <StaggerItem key={perk}>
                    <div className="flex items-center gap-3 text-sm text-white/85">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {perk}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <p className="text-xs text-white/45">© {new Date().getFullYear()} {siteConfig.name}</p>
          </div>
        </div>

        {/* Form panel */}
        <div className="relative flex flex-col bg-white">
          <div className="flex items-center justify-between px-6 py-5 sm:px-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-title/60 transition hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to shop
            </Link>
            <Link href="/" className="lg:hidden">
              <Image
                src="/assets/images/dotchbg.png"
                alt={siteConfig.name}
                width={200}
                height={36}
                className="h-7 w-auto"
              />
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center px-6 pb-12 pt-4 sm:px-10 lg:px-14">
            <Reveal className="w-full max-w-[420px]">
              <div className="mb-8">
                <h2 className="font-display text-3xl font-medium leading-tight text-title sm:text-4xl">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-title/60 sm:text-[0.95rem]">
                  {subtitle}
                </p>
              </div>

              {children}

              <p className="mt-8 text-center text-sm text-title/60">
                {footerText}{" "}
                <Link
                  href={footerLinkHref}
                  className="font-semibold text-primary underline-offset-4 transition hover:text-secondary hover:underline"
                >
                  {footerLinkLabel}
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AuthField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <StaggerItem>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-title">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={authInputClassName}
      />
    </StaggerItem>
  );
}

export function AuthPasswordField({
  id,
  label,
  placeholder,
  autoComplete,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <StaggerItem>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-title">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${authInputClassName} pr-12`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-title/35 transition hover:bg-title/5 hover:text-primary"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </StaggerItem>
  );
}

export function AuthDivider() {
  return (
    <div className="relative my-1 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-title/35">
      <span className="relative z-10 bg-white px-3">Or</span>
      <span className="absolute inset-x-0 top-1/2 h-px bg-title/10" aria-hidden />
    </div>
  );
}

export function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
