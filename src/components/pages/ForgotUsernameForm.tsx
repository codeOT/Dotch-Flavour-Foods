"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AuthField, AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

export function ForgotUsernameForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    found: boolean;
    username?: string;
    emailHint?: string;
    message: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/account/forgot-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const data = (await response.json()) as {
        found?: boolean;
        username?: string;
        emailHint?: string;
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        setError(data.error ?? "Unable to look up your username.");
        return;
      }

      setResult({
        found: Boolean(data.found),
        username: data.username,
        emailHint: data.emailHint,
        message: data.message ?? "",
      });
    } catch {
      setError("Unable to look up your username. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Forgot username?"
      subtitle="Enter the email or phone number on your account and we will remind you of your username."
      footerText="Remembered your details?"
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
            required={false}
            value={email}
            onChange={setEmail}
          />
          <div className="relative py-1 text-center text-xs font-semibold uppercase tracking-wider text-title/40">
            <span className="bg-white px-3">or</span>
            <span className="absolute inset-x-0 top-1/2 -z-10 h-px bg-title/10" />
          </div>
          <AuthField
            id="phone"
            label="Phone number"
            type="tel"
            placeholder="+447700900123"
            autoComplete="tel"
            required={false}
            value={phone}
            onChange={setPhone}
          />

          {error && (
            <StaggerItem>
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            </StaggerItem>
          )}

          {result && (
            <StaggerItem>
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  result.found
                    ? "border-primary/20 bg-primary/5 text-title"
                    : "border-amber-200 bg-amber-50 text-amber-950"
                }`}
              >
                <p>{result.message}</p>
                {result.found && result.username ? (
                  <p className="mt-3 text-base font-bold text-primary">
                    Username: {result.username}
                  </p>
                ) : null}
                {result.found ? (
                  <p className="mt-3">
                    <Link href="/sign-in" className="font-semibold text-primary hover:underline">
                      Continue to sign in
                    </Link>
                  </p>
                ) : (
                  <p className="mt-3">
                    Need help?{" "}
                    <Link href="/contact-us" className="font-semibold underline">
                      Contact us
                    </Link>
                  </p>
                )}
              </div>
            </StaggerItem>
          )}

          <StaggerItem>
            <Button type="submit" fullWidth loading={loading} className="!rounded-2xl !py-3.5">
              Recover username
            </Button>
          </StaggerItem>
        </form>

        <StaggerItem>
          <p className="text-center text-xs text-title/45">
            Forgot your password instead?{" "}
            <Link href="/contact-us" className="font-semibold text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </StaggerItem>
      </StaggerContainer>
    </AuthLayout>
  );
}
