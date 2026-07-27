"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AdminSignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = useMemo(() => {
    const value = searchParams.get("callbackUrl");
    return value && value.startsWith("/") ? value : "/admin";
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(payload.error ?? "Unable to sign in.");
        return;
      }
      router.replace(callbackUrl);
      router.refresh();
    } catch {
      setError("Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#192e22] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 15% 15%, rgba(214,184,152,0.18), transparent 55%), radial-gradient(ellipse 55% 45% at 90% 80%, rgba(87,72,33,0.55), transparent 50%), linear-gradient(160deg, rgba(25,46,34,0.2) 0%, rgba(15,30,22,0.55) 55%, rgba(10,22,16,0.7) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center lg:flex-row">
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-1 flex-col justify-between px-6 py-8 sm:px-10 sm:py-12 lg:px-12"
        >
          

          <div className="my-12 max-w-md lg:my-0">
            

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.55 }}
              className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
            >
              Dotch Flavour
              <span className="mt-1 block text-amber-200/90">Foods</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.55 }}
              className="mt-4 text-base leading-relaxed text-slate-300"
            >
              Sign in with your admin credentials to manage orders, inventory, and
              revenue.
            </motion.p>

            
          </div>

          <p className="hidden text-xs text-slate-500 lg:block">
            Authorized personnel only. Unauthorized access is prohibited.
          </p>
        </motion.aside>

        <div className="flex flex-1 items-center justify-center px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl shadow-black/40">
              <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-5 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200">
                    <Image
                      src="/assets/images/favicon.png"
                      alt="Dotch Flavours"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Admin portal
                    </p>
                    <p className="text-sm font-semibold text-slate-900">Sign in to continue</p>
                  </div>
                </div>
              </div>

              <form
                className="space-y-5 px-6 py-7 sm:px-8 sm:py-8"
                onSubmit={(event) => void onSubmit(event)}
              >
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">Admin email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="admin@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15"
                    autoComplete="username"
                    required
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">Admin password</span>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter admin password"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-slate-700"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700"
                    role="alert"
                  >
                    {error}
                  </motion.p>
                )}

                <Button type="submit" className="w-full !rounded-xl" fullWidth loading={loading}>
                  Access dashboard
                </Button>

                <p className="text-center text-xs leading-relaxed text-slate-500">
                  Customer accounts cannot access this area. Use your dedicated admin
                  email and password only.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
