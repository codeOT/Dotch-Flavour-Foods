"use client";

import Link from "next/link";
import { useState } from "react";
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

export function SignInForm() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage orders, saved items, and checkout faster."
      footerText="Don't have an account?"
      footerLinkHref="/sign-up"
      footerLinkLabel="Create account"
    >
      <StaggerContainer>
        <form
          className="space-y-4 rounded-2xl border border-surface bg-white p-6 shadow-sm sm:p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <AuthField
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <PasswordField
            id="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          <StaggerItem>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-title/70">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-surface accent-primary"
                />
                Remember me
              </label>
              <Link href="/contact-us" className="font-medium text-primary hover:text-secondary">
                Forgot password?
              </Link>
            </div>
          </StaggerItem>

          <StaggerItem>
            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </StaggerItem>
        </form>
      </StaggerContainer>
    </AuthLayout>
  );
}
