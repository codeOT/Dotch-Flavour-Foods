import type { Metadata } from "next";
import { SignUpForm } from "@/components/pages/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Dotch Flavours Foods account.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
