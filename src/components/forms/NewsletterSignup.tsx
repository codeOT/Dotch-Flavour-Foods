"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

type NewsletterSignupProps = {
  variant?: "light" | "dark" | "home";
  className?: string;
};

export function NewsletterSignup({ variant = "light", className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const isDark = variant === "dark";
  const isHome = variant === "home";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) {
      setStatus("error");
      setFeedback("Please confirm you want to receive emails from Dotch Flavour Foods.");
      return;
    }

    setStatus("success");
    setFeedback("You’re on the list — thank you. We’ll only send launch updates and offers you’ve opted into.");
    setEmail("");
    setConsent(false);
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-2xl border p-5 text-center sm:p-6 ${
          isDark
            ? "border-white/10 bg-white/5 text-white"
            : "border-primary/20 bg-primary/5 text-title"
        } ${className}`}
      >
        <span
          className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${
            isDark ? "bg-secondary text-white" : "bg-primary text-white"
          }`}
        >
          <Check className="h-6 w-6" />
        </span>
        <p className="text-sm font-medium sm:text-base">{feedback}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={`mt-4 text-sm font-semibold underline-offset-2 hover:underline ${
            isDark ? "text-secondary" : "text-primary"
          }`}
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  const inputClass = isDark
    ? "w-full rounded-lg border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-secondary focus:ring-1 focus:ring-secondary"
    : "w-full rounded-xl border border-surface bg-white px-4 py-3 text-sm text-title outline-none transition placeholder:text-title/40 focus:border-primary focus:ring-2 focus:ring-primary/15";

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      {isHome && (
        <div className="mb-2 text-center sm:text-left">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
            Newsletter
          </p>
          <h2 className="text-2xl font-bold text-title sm:text-3xl">Launch updates & offers</h2>
          <p className="mt-2 max-w-xl text-sm text-title/65">
            Be first to hear about Ready Soups drops, experiences, and merchandise — with clear
            consent, no spam.
          </p>
        </div>
      )}

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        autoComplete="email"
        className={inputClass}
      />

      <label
        className={`flex cursor-pointer items-start gap-3 text-xs leading-relaxed ${
          isDark ? "text-white/65" : "text-title/65"
        }`}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-surface accent-primary"
        />
        <span>
          I want to receive email updates from Dotch Flavour Foods. I can unsubscribe anytime. See
          our{" "}
          <Link
            href="/privacy-policy"
            className={isDark ? "text-secondary hover:underline" : "text-primary hover:underline"}
          >
            privacy policy
          </Link>{" "}
          and{" "}
          <Link
            href="/email-newsletter-terms"
            className={isDark ? "text-secondary hover:underline" : "text-primary hover:underline"}
          >
            email terms
          </Link>
          .
        </span>
      </label>

      {status === "error" && feedback && (
        <p
          className={`rounded-lg px-3 py-2 text-xs ${
            isDark ? "bg-red-500/20 text-red-200" : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {feedback}
        </p>
      )}

      <Button
        type="submit"
        fullWidth={isDark || isHome}
        className={isDark ? "!bg-secondary hover:!bg-orange" : undefined}
      >
        Subscribe <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
