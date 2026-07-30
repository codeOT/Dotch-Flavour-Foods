"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

export function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Unable to create account.");
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/sign-in");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join Dotch Flavour to order Ready Soups, track deliveries, and checkout faster."
      footerText="Already have an account?"
      footerLinkHref={`/sign-in${callbackUrl !== "/" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
      footerLinkLabel="Sign in"
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
            id="fullName"
            label="Full name"
            placeholder="Your full name"
            autoComplete="name"
            value={fullName}
            onChange={setFullName}
          />
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
            placeholder="Create a password"
            autoComplete="new-password"
            value={password}
            onChange={setPassword}
          />
          <AuthPasswordField
            id="confirmPassword"
            label="Confirm password"
            placeholder="Repeat your password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          <StaggerItem>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-title/65">
              <input
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-title/20 accent-primary"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="font-medium text-primary hover:underline">
                  terms
                </Link>
                ,{" "}
                <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
                  privacy policy
                </Link>
                , and order updates by email.
              </span>
            </label>
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
              Create account
            </Button>
          </StaggerItem>
        </form>
      </StaggerContainer>
    </AuthLayout>
  );
}
