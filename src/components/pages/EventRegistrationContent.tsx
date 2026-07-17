"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Check, Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { currentEvent } from "@/lib/events";
import { slideLeft, slideRight } from "@/lib/motion";

const inputClassName =
  "w-full rounded-xl border border-surface bg-white px-4 py-3 text-sm text-title outline-none transition placeholder:text-title/40 focus:border-primary focus:ring-2 focus:ring-primary/15";

export function EventRegistrationContent() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!consent) {
      setStatus("error");
      setFeedback("Please agree to be contacted about this event.");
      return;
    }

    setStatus("success");
    setFeedback("Thank you for registering. We will be in touch soon.");
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setConsent(false);
  }

  return (
    <section className="overflow-hidden bg-white py-12 sm:py-16">
      <div className="container-fluid min-w-0">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary sm:text-sm">
            Events
          </p>
          <h1 className="text-balance text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight text-title">
            {currentEvent.name}
          </h1>
          <p className="mt-4 text-base text-title/70 sm:text-lg">{currentEvent.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-title/60 sm:text-base">
            {currentEvent.description}
          </p>
        </Reveal>

        <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal variants={slideRight}>
            <div className="rounded-2xl border border-surface bg-surface/20 p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-title">What to expect</p>
                  <p className="text-xs text-title/60">Register now — details sent by email</p>
                </div>
              </div>

              <StaggerContainer className="space-y-4">
                {currentEvent.highlights.map((highlight) => (
                  <StaggerItem key={highlight}>
                    <div className="flex items-start gap-3 text-sm text-title/80">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                        <Check className="h-3 w-3" />
                      </span>
                      {highlight}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </Reveal>

          <Reveal variants={slideLeft}>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center"
              >
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-7 w-7" />
                </span>
                <h2 className="text-xl font-bold text-title">You&apos;re registered!</h2>
                <p className="mt-3 text-sm leading-relaxed text-title/70">{feedback}</p>
                <Button
                  type="button"
                  className="mt-6"
                  onClick={() => setStatus("idle")}
                >
                  Register another guest
                </Button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl border border-surface bg-white p-6 shadow-sm sm:p-8"
              >
                <div>
                  <label htmlFor="fullName" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-title">
                    <User className="h-4 w-4 text-primary" />
                    Full name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    autoComplete="name"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-title">
                    <Mail className="h-4 w-4 text-primary" />
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-title">
                    Phone number <span className="font-normal text-title/50">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7XXX XXXXXX"
                    autoComplete="tel"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-title">
                    Message <span className="font-normal text-title/50">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Dietary requirements, group size, or questions..."
                    className={inputClassName}
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-title/70">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-surface accent-primary"
                  />
                  <span>
                    I agree to be contacted by Dotch Flavours Foods about this event. See our{" "}
                    <Link href="/privacy-policy" className="text-primary underline-offset-2 hover:underline">
                      privacy policy
                    </Link>
                    .
                  </span>
                </label>

                {status === "error" && feedback && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {feedback}
                  </p>
                )}

                <Button type="submit" fullWidth>
                  Register for event
                </Button>
              </motion.form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
