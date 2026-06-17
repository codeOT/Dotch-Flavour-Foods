import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SignInForm } from "@/components/pages/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <>
      <PageHeader title="Sign In" description="Welcome back. Sign in to your account." />
      <section className="py-16">
        <SignInForm />
      </section>
    </>
  );
}
