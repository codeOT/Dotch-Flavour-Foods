import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/pages/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Choose a new password for your Dotch Flavour Foods account.",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-40 w-full max-w-md animate-pulse rounded-2xl bg-surface/40" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
