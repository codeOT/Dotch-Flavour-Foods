import type { Metadata } from "next";
import { Suspense } from "react";
import { SignInForm } from "@/components/pages/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Dotch Flavour Foods account.",
};

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-40 w-full max-w-md animate-pulse rounded-2xl bg-surface/40" />
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
