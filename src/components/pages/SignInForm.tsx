"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
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
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-title">
        {label}
      </label>
      <div className="relative">
        <motion.input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
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

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.6-2.5-5.6-5.6S8.9 6.2 12 6.2c1.8 0 3 .7 3.7 1.4l2.5-2.4C16.8 3.8 14.6 3 12 3 7 3 3 7 3 12s4 9 9 9c5.2 0 8.6-3.6 8.6-8.8 0-.6-.1-1-.2-1.5H12z"
      />
    </svg>
  );
}

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
          onSubmit={handleSubmit}
        >
          <AuthField
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={setEmail}
          />
          <PasswordField
            id="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
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

          {error && (
            <StaggerItem>
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            </StaggerItem>
          )}

          <StaggerItem>
            <Button type="submit" fullWidth loading={loading}>
              Sign in
            </Button>
          </StaggerItem>

          <StaggerItem>
            <div className="relative my-2 text-center text-xs uppercase tracking-wider text-title/40">
              <span className="relative z-10 bg-white px-3">Or</span>
              <span className="absolute inset-x-0 top-1/2 h-px bg-surface" aria-hidden />
            </div>
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => signIn("google", { callbackUrl })}
            >
              <GoogleIcon />
              Continue with Google
            </Button>
          </StaggerItem>
        </form>
      </StaggerContainer>
    </AuthLayout>
  );
}
