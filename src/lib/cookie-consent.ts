export const COOKIE_CONSENT_KEY = "dotch-cookie-consent";
export const COOKIE_CONSENT_VERSION = 1;

export type CookieCategory = "necessary" | "functional" | "analytics" | "marketing";

export type CookiePreferences = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type CookieConsent = {
  version: number;
  updatedAt: string;
  preferences: CookiePreferences;
};

export const defaultPreferences: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export const acceptedPreferences: CookiePreferences = {
  necessary: true,
  functional: true,
  analytics: true,
  marketing: true,
};

export function isValidConsent(value: unknown): value is CookieConsent {
  if (!value || typeof value !== "object") return false;
  const consent = value as CookieConsent;
  return (
    consent.version === COOKIE_CONSENT_VERSION &&
    typeof consent.updatedAt === "string" &&
    Boolean(consent.preferences) &&
    consent.preferences.necessary === true &&
    typeof consent.preferences.functional === "boolean" &&
    typeof consent.preferences.analytics === "boolean" &&
    typeof consent.preferences.marketing === "boolean"
  );
}

export function readStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    return isValidConsent(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeStoredConsent(preferences: CookiePreferences): CookieConsent {
  const consent: CookieConsent = {
    version: COOKIE_CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    preferences: { ...preferences, necessary: true },
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  return consent;
}
