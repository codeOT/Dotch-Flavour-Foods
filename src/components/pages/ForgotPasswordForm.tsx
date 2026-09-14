"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AuthField, AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/account/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setError(data.error ?? "Unable to send reset email.");
        return;
      }

      setMessage(
        data.message ??
          "If an account exists for that email, we've sent password reset instructions.",
      );
    } catch {
      setError("Unable to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter the email on your account and we'll send a link to choose a new password."
      footerText="Remembered your password?"
      footerLinkHref="/sign-in"
      footerLinkLabel="Sign in"
    >
      <StaggerContainer className="space-y-5">
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

          {error && (
            <StaggerItem>
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            </StaggerItem>
          )}

          {message && (
            <StaggerItem>
              <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-title">
                <p>{message}</p>
                <p className="mt-3">
                  <Link href="/sign-in" className="font-semibold text-primary hover:underline">
                    Back to sign in
                  </Link>
                </p>
              </div>
            </StaggerItem>
          )}

          <StaggerItem>
            <Button type="submit" fullWidth loading={loading} className="!rounded-2xl !py-3.5">
              Send reset link
            </Button>
          </StaggerItem>
        </form>

        <StaggerItem>
          <p className="text-center text-xs text-title/45">
            Need help?{" "}
            <Link href="/contact-us" className="font-semibold text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </AuthLayout>
  );
}
