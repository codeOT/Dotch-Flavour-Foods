"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { AuthField, AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

function PasswordField({
  id,
  label,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <StaggerItem>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-title">
        {label}
      </label>
      <div className="relative">
        <motion.input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          required
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-xl border border-surface bg-white px-4 py-3 pr-11 text-sm text-title outline-none transition placeholder:text-title/40 focus:border-primary focus:ring-2 focus:ring-primary/15"
          whileFocus={{ scale: 1.01 }}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-title/40 transition hover:text-primary"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </StaggerItem>
  );
}

export function SignUpForm() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Dotch Flavours Foods to order ready meals and track deliveries."
      footerText="Already have an account?"
      footerLinkHref="/sign-in"
      footerLinkLabel="Sign in"
    >
      <StaggerContainer>
        <form
          className="space-y-4 rounded-2xl border border-surface bg-white p-6 shadow-sm sm:p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <AuthField
            id="fullName"
            label="Full name"
            placeholder="Mrs Abimbola Olurin"
            autoComplete="name"
          />
          <AuthField
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <AuthField
            id="phone"
            label="Phone number"
            type="tel"
            placeholder="+44 7XXX XXXXXX"
            autoComplete="tel"
          />
          <PasswordField
            id="password"
            label="Password"
            placeholder="Create a password"
            autoComplete="new-password"
          />
          <PasswordField
            id="confirmPassword"
            label="Confirm password"
            placeholder="Repeat your password"
            autoComplete="new-password"
          />

          <StaggerItem>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-title/70">
              <input
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-surface accent-primary"
              />
              <span>
                I agree to the{" "}
                <Link href="/delivery-terms" className="text-primary underline-offset-2 hover:underline">
                  delivery terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-primary underline-offset-2 hover:underline">
                  privacy policy
                </Link>
                , and consent to order updates by email.
              </span>
            </label>
          </StaggerItem>

          <StaggerItem>
            <Button type="submit" fullWidth>
              Create account
            </Button>
          </StaggerItem>
        </form>
      </StaggerContainer>
    </AuthLayout>
  );
}
