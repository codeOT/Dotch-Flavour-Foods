"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { AuthField, AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

function PasswordField({
  id,
  label,
  placeholder,
  autoComplete,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <StaggerItem>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-title">
        {label}
      </label>
      <div className="relative">
        <motion.input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-xl border border-surface bg-white px-4 py-3 pr-11 text-sm text-title outline-none transition placeholder:text-title/40 focus:border-primary focus:ring-2 focus:ring-primary/15"
          whileFocus={{ scale: 1.01 }}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-title/40 transition hover:text-primary"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </StaggerItem>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.6-2.5-5.6-5.6S8.9 6.2 12 6.2c1.8 0 3 .7 3.7 1.4l2.5-2.4C16.8 3.8 14.6 3 12 3 7 3 3 7 3 12s4 9 9 9c5.2 0 8.6-3.6 8.6-8.8 0-.6-.1-1-.2-1.5H12z"
      />
    </svg>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          password,
          confirmPassword,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Unable to create account.");
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/sign-in");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Dotch Flavours Foods to order ready meals and track deliveries."
      footerText="Already have an account?"
      footerLinkHref="/sign-in"
      footerLinkLabel="Sign in"
    >
      <StaggerContainer>
        <form
          className="space-y-4 rounded-2xl border border-surface bg-white p-6 shadow-sm sm:p-8"
          onSubmit={handleSubmit}
        >
          <AuthField
            id="fullName"
            label="Full name"
            placeholder="Mrs Abimbola Olurin"
            autoComplete="name"
            value={fullName}
            onChange={setFullName}
          />
          <AuthField
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={setEmail}
          />
          <AuthField
            id="phone"
            label="Phone number"
            type="tel"
            placeholder="+44 7XXX XXXXXX"
            autoComplete="tel"
            required={false}
            value={phone}
            onChange={setPhone}
          />
          <PasswordField
            id="password"
            label="Password"
            placeholder="Create a password"
            autoComplete="new-password"
            value={password}
            onChange={setPassword}
          />
          <PasswordField
            id="confirmPassword"
            label="Confirm password"
            placeholder="Repeat your password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          <StaggerItem>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-title/70">
              <input
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-surface accent-primary"
              />
              <span>
                I agree to the{" "}
                <Link href="/delivery-terms" className="text-primary underline-offset-2 hover:underline">
                  delivery terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-primary underline-offset-2 hover:underline">
                  privacy policy
                </Link>
                , and consent to order updates by email.
              </span>
            </label>
          </StaggerItem>

          {error && (
            <StaggerItem>
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            </StaggerItem>
          )}

          <StaggerItem>
            <Button type="submit" fullWidth loading={loading}>
              Create account
            </Button>
          </StaggerItem>

          <StaggerItem>
            <div className="relative my-2 text-center text-xs uppercase tracking-wider text-title/40">
              <span className="relative z-10 bg-white px-3">Or</span>
              <span className="absolute inset-x-0 top-1/2 h-px bg-surface" aria-hidden />
            </div>
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <GoogleIcon />
              Continue with Google
            </Button>
          </StaggerItem>
        </form>
      </StaggerContainer>
    </AuthLayout>
  );
}
