import type { Metadata } from "next";
import { Suspense } from "react";
import { SignUpForm } from "@/components/pages/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Dotch Flavour Foods account.",
};

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-40 w-full max-w-md animate-pulse rounded-2xl bg-surface/40" />
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
