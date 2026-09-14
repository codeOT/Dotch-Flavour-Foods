"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout, AuthPasswordField } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!token) {
      setError("This reset link is invalid or has expired. Request a new one.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/account/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setError(data.error ?? "Unable to reset password.");
        return;
      }

      setMessage(data.message ?? "Your password has been updated.");
      window.setTimeout(() => {
        router.push("/sign-in");
        router.refresh();
      }, 1500);
    } catch {
      setError("Unable to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Choose a new password"
      subtitle="Enter a new password for your Dotch Flavour Foods account."
      footerText="Back to"
      footerLinkHref="/sign-in"
      footerLinkLabel="Sign in"
    >
      <StaggerContainer className="space-y-5">
        {!token ? (
          <StaggerItem>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              <p>This reset link is missing or invalid.</p>
              <p className="mt-3">
                <Link href="/forgot-password" className="font-semibold underline">
                  Request a new reset link
                </Link>
              </p>
            </div>
          </StaggerItem>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <AuthPasswordField
              id="password"
              label="New password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              value={password}
              onChange={setPassword}
            />
            <AuthPasswordField
              id="confirmPassword"
              label="Confirm new password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={setConfirmPassword}
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
                <p className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-title">
                  {message}
                </p>
              </StaggerItem>
            )}

            <StaggerItem>
              <Button type="submit" fullWidth loading={loading} className="!rounded-2xl !py-3.5">
                Update password
              </Button>
            </StaggerItem>
          </form>
        )}
      </StaggerContainer>
    </AuthLayout>
  );
}
