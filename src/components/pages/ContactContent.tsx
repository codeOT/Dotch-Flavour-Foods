"use client";

import Link from "next/link";
import {
  Building2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site";

const inputClassName =
  "box-border block w-full min-w-0 max-w-full rounded-lg border border-surface bg-white px-3.5 py-3 text-base text-title outline-none transition placeholder:text-title/40 focus:border-primary focus:ring-2 focus:ring-primary/15 sm:text-sm";

const enquiryRoutes = [
  {
    icon: UtensilsCrossed,
    title: "Private catering",
    text: "Celebrations and tray orders",
    href: "/catering",
  },
  {
    icon: Building2,
    title: "Corporate catering",
    text: "Offices, meetings, team events",
    href: "/corporate",
  },
  {
    icon: Store,
    title: "Wholesale / stockists",
    text: "Retail and hospitality partners",
    href: "/wholesale",
  },
] as const;

export function ContactContent() {
  const { contact } = siteConfig;
  const whatsappNumber = contact.phone.replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Dotch Flavour Foods, I have a question about ordering / catering / Ready Soups.",
  )}`;

  const contactItems = [
    { icon: Phone, title: "Phone", text: contact.phone, href: `tel:${whatsappNumber}` },
    { icon: Mail, title: "Email", text: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, title: "Address", text: contact.address },
  ] as const;

  return (
    <div className="w-full min-w-0 overflow-x-clip">
      <section className="bg-primary-dark px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto w-full min-w-0 max-w-2xl text-center">
          <Reveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              Contact
            </p>
            <h1 className="text-[1.75rem] font-bold leading-tight sm:text-4xl">How can we help?</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
              Ready Soups orders use website checkout. Fresh customisations, catering, and special
              requests are fastest on WhatsApp. We typically reply within 1–2 working days.
            </p>
            <div className="mt-6 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                href={whatsappHref}
                fullWidth
                className="!w-full !bg-secondary hover:!bg-orange sm:!w-auto"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                WhatsApp
              </Button>
              <Button
                href="/request-a-quote"
                variant="outline"
                fullWidth
                className="!w-full !border-white !text-white hover:!bg-white hover:!text-primary sm:!w-auto"
              >
                Request a quote
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto w-full min-w-0 max-w-[1400px]">
          <div className="mb-8 grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {enquiryRoutes.map((route) => (
              <Reveal key={route.title} className="min-w-0">
                <Link
                  href={route.href}
                  className="flex h-full w-full min-w-0 items-start gap-3 rounded-2xl border border-surface bg-white p-4 shadow-sm transition hover:border-primary/25"
                >
                  <route.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="break-words font-semibold text-title">{route.title}</p>
                    <p className="break-words text-sm text-title/65">{route.text}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <Reveal className="min-w-0">
              <div className="space-y-5">
                {contactItems.map((item) => (
                  <div key={item.title} className="flex w-full min-w-0 gap-3">
                    <item.icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-title">{item.title}</h3>
                      {"href" in item && item.href ? (
                        <a
                          href={item.href}
                          className="break-all text-sm text-title/70 transition hover:text-primary sm:text-base"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <p className="break-words text-sm text-title/70 sm:text-base">{item.text}</p>
                      )}
                    </div>
                  </div>
                ))}
                <p className="text-xs leading-relaxed text-title/55">
                  Include your postcode for delivery questions. For retail stockist volumes, use{" "}
                  <Link href="/wholesale" className="font-semibold text-primary hover:underline">
                    Wholesale
                  </Link>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal className="min-w-0">
              <form
                className="box-border w-full min-w-0 max-w-full space-y-4 rounded-2xl border border-surface bg-white p-4 shadow-sm sm:p-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <p className="text-sm font-semibold text-title">General message</p>
                <label className="block w-full min-w-0 space-y-1.5">
                  <span className="sr-only">Your name</span>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    autoComplete="name"
                    className={inputClassName}
                  />
                </label>
                <label className="block w-full min-w-0 space-y-1.5">
                  <span className="sr-only">Your email</span>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    autoComplete="email"
                    className={inputClassName}
                  />
                </label>
                <label className="block w-full min-w-0 space-y-1.5">
                  <span className="sr-only">Your message</span>
                  <textarea
                    required
                    rows={5}
                    placeholder="Your Message"
                    className={inputClassName}
                  />
                </label>
                <Button type="submit" fullWidth className="!w-full">
                  Send Message
                </Button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
