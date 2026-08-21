import type { Metadata } from "next";
import { ForgotUsernameForm } from "@/components/pages/ForgotUsernameForm";

export const metadata: Metadata = {
  title: "Forgot username",
  description: "Recover your Dotch Flavour Foods account username.",
  robots: { index: false, follow: false },
};

export default function ForgotUsernamePage() {
  return <ForgotUsernameForm />;
}
