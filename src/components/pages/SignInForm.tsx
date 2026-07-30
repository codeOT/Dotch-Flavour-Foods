"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import {
  AuthDivider,
  AuthField,
  AuthLayout,
  AuthPasswordField,
  GoogleIcon,
} from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

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
      subtitle="Sign in to manage orders, save your details, and checkout faster."
      footerText="Don't have an account?"
      footerLinkHref={`/sign-up${callbackUrl !== "/" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
      footerLinkLabel="Create account"
    >
      <StaggerContainer className="space-y-5">
        <StaggerItem>
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="button"
              variant="outline"
              fullWidth
              className="!rounded-2xl !border-title/10 !bg-white hover:!border-primary/30 hover:!bg-[#f7f5f1]"
              onClick={() => signIn("google", { callbackUrl })}
            >
              <GoogleIcon />
              Continue with Google
            </Button>
          </motion.div>
        </StaggerItem>

        <StaggerItem>
          <AuthDivider />
        </StaggerItem>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <AuthField
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={setEmail}
          />
          <AuthPasswordField
            id="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
          />

          <StaggerItem>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-title/65">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-title/20 accent-primary"
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
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            </StaggerItem>
          )}

          <StaggerItem>
            <Button type="submit" fullWidth loading={loading} className="!rounded-2xl !py-3.5">
              Sign in
            </Button>
          </StaggerItem>
        </form>

        <StaggerItem>
          <p className="text-center text-xs text-title/45">
            Prefer not to create an account?{" "}
            <Link href="/shop/checkout" className="font-semibold text-primary hover:underline">
              Continue as guest
            </Link>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </AuthLayout>
  );
}
