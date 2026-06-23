import type { Metadata } from "next";
import { SignInForm } from "@/components/pages/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Dotch Flavours Foods account.",
};

export default function SignInPage() {
  return <SignInForm />;
}
