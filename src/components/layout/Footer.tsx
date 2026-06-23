"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import { footerLinks } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";
import { useCart } from "@/context/CartContext";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

const contactItems = [
  {
    icon: Phone,
    label: "Call us",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.contact.addressShort,
  },
];

export function Footer() {
  const { openCart } = useCart();

  return (
    <footer className="relative overflow-hidden bg-primary-dark text-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary via-cream to-secondary" />

      <motion.div
        className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-cream/5 blur-3xl"
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-fluid relative z-10 min-w-0 py-14 sm:py-20">
        <div className="mb-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand column */}
          <Reveal className="lg:col-span-5">
            <Link href="/" className="mb-5 inline-block">
              <Image
                src="/assets/images/dotchbg.png"
                alt="Dotch Flavours Foods logo"
                width={320}
                height={56}
                className="h-11 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/75">
              Authentic Nigerian flavours, thoughtfully prepared. Ready-to-eat soups, sauces, and
              stews — slow-cooked with care, ready in minutes.
            </p>

            <div className="space-y-3">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3 text-sm">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="text-white/85 transition hover:text-secondary">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white/85">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Links columns */}
          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:col-span-4">
            <StaggerItem>
              <h5 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary">
                Explore
              </h5>
              <ul className="space-y-2.5 text-sm">
                {footerLinks.ourLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/75 transition hover:translate-x-1 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>
            <StaggerItem>
              <h5 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary">
                Support
              </h5>
              <ul className="space-y-2.5 text-sm">
                {footerLinks.helpCenter.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/75 transition hover:translate-x-1 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={openCart}
                    className="text-white/75 transition hover:translate-x-1 hover:text-white"
                  >
                    Shopping Cart
                  </button>
                </li>
              </ul>
            </StaggerItem>
          </StaggerContainer>

          {/* Newsletter */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <h5 className="mb-2 text-base font-semibold">Stay in the loop</h5>
              <p className="mb-4 text-xs text-white/60">
                New dishes, offers, and recipes — straight to your inbox.
              </p>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-secondary focus:ring-1 focus:ring-secondary"
                />
                <motion.button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold uppercase tracking-wide transition hover:bg-orange"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe <Send className="h-4 w-4" />
                </motion.button>
              </form>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <p>© {new Date().getFullYear()} Dotch Flavours Foods. All rights reserved.</p>
            <p>
              Made with care by{" "}
              <a
                href="https://codeot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition hover:text-secondary"
              >
                CodeOT
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
