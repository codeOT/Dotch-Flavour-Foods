"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { defaultPreferences, type CookiePreferences } from "@/lib/cookie-consent";

const CATEGORIES: {
  key: keyof Omit<CookiePreferences, "necessary">;
  label: string;
  description: string;
}[] = [
  {
    key: "functional",
    label: "Functional",
    description: "Remember choices such as display preferences.",
  },
  {
    key: "analytics",
    label: "Analytics",
    description: "Help us understand visits, pages, and technical performance.",
  },
  {
    key: "marketing",
    label: "Marketing",
    description: "Measure campaigns and personalise advertising where used.",
  },
];

export function CookieBanner() {
  const {
    showBanner,
    showSettings,
    preferences,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openSettings,
    closeSettings,
  } = useCookieConsent();
  const [draft, setDraft] = useState<CookiePreferences>(preferences);
  const visible = showBanner || showSettings;

  useEffect(() => {
    if (showSettings) setDraft(preferences);
  }, [showSettings, preferences]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-5">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-title"
        className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-surface bg-white shadow-2xl"
      >
        <div className="flex items-start gap-3 border-b border-surface px-4 py-4 sm:px-6">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <Cookie className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0">
            <h2 id="cookie-banner-title" className="text-base font-bold text-title sm:text-lg">
              Cookies
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-title/70">
              We use strictly necessary cookies for the basket, checkout, and security. You can
              accept or reject non-essential cookies. Read our{" "}
              <Link href="/cookie-policy" className="font-semibold text-primary hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {showSettings && (
          <div className="space-y-3 border-b border-surface px-4 py-4 sm:px-6">
            <label className="flex items-start justify-between gap-4 rounded-xl bg-surface/30 px-3 py-3">
              <span>
                <span className="block text-sm font-semibold">Strictly necessary</span>
                <span className="mt-0.5 block text-xs text-title/60">
                  Required for security, basket, checkout, and consent settings.
                </span>
              </span>
              <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-primary" />
            </label>
            {CATEGORIES.map((category) => (
              <label
                key={category.key}
                className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-surface px-3 py-3"
              >
                <span>
                  <span className="block text-sm font-semibold">{category.label}</span>
                  <span className="mt-0.5 block text-xs text-title/60">{category.description}</span>
                </span>
                <input
                  type="checkbox"
                  checked={draft[category.key]}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      [category.key]: event.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4 accent-primary"
                />
              </label>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:flex-wrap sm:justify-end sm:px-6">
          {showSettings ? (
            <>
              <CookieActionButton
                variant="outline"
                onClick={() => {
                  setDraft(defaultPreferences);
                  closeSettings();
                }}
              >
                Cancel
              </CookieActionButton>
              <CookieActionButton onClick={() => savePreferences(draft)}>
                Save choices
              </CookieActionButton>
            </>
          ) : (
            <>
              <CookieActionButton variant="outline" onClick={rejectNonEssential}>
                Reject non-essential
              </CookieActionButton>
              <CookieActionButton
                variant="outline"
                onClick={() => {
                  setDraft(preferences);
                  openSettings();
                }}
              >
                Cookie settings
              </CookieActionButton>
              <CookieActionButton onClick={acceptAll}>Accept all</CookieActionButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CookieActionButton({
  children,
  onClick,
  variant = "primary",
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "outline";
}) {
  const classes =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-hover"
      : "border-2 border-primary text-primary hover:bg-primary hover:text-white";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-xs font-semibold uppercase tracking-wide transition sm:w-auto sm:px-6 sm:text-sm ${classes}`}
    >
      {children}
    </button>
  );
}
