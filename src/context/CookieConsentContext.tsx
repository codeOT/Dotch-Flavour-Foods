"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  acceptedPreferences,
  defaultPreferences,
  readStoredConsent,
  writeStoredConsent,
  type CookieConsent,
  type CookiePreferences,
} from "@/lib/cookie-consent";

type CookieConsentContextValue = {
  isHydrated: boolean;
  consent: CookieConsent | null;
  showBanner: boolean;
  showSettings: boolean;
  preferences: CookiePreferences;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (preferences: CookiePreferences) => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setConsent(readStoredConsent());
    setIsHydrated(true);
  }, []);

  const persist = useCallback((preferences: CookiePreferences) => {
    const next = writeStoredConsent(preferences);
    setConsent(next);
    setShowSettings(false);
  }, []);

  const acceptAll = useCallback(() => persist(acceptedPreferences), [persist]);
  const rejectNonEssential = useCallback(() => persist(defaultPreferences), [persist]);
  const savePreferences = useCallback(
    (preferences: CookiePreferences) => persist({ ...preferences, necessary: true }),
    [persist],
  );
  const openSettings = useCallback(() => setShowSettings(true), []);
  const closeSettings = useCallback(() => setShowSettings(false), []);

  const value = useMemo(
    () => ({
      isHydrated,
      consent,
      showBanner: isHydrated && !consent,
      showSettings,
      preferences: consent?.preferences ?? defaultPreferences,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openSettings,
      closeSettings,
    }),
    [
      isHydrated,
      consent,
      showSettings,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openSettings,
      closeSettings,
    ],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}
