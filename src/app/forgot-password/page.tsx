import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/pages/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset your Dotch Flavour Foods account password.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
