export const CHECKOUT_IDEMPOTENCY_HEADER = "Idempotency-Key";
export const CHECKOUT_IDEMPOTENCY_STORAGE_KEY = "dotch-checkout-idempotency";

export function isValidIdempotencyKey(value: string) {
  return /^[\w-]{8,255}$/.test(value);
}

export function isDuplicateKeyError(error: unknown) {
  return Boolean(
    error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: number }).code === 11000,
  );
}

function checkoutFingerprint(payload: unknown) {
  return JSON.stringify(payload);
}

export function getOrCreateCheckoutIdempotencyKey(payload: unknown) {
  const fingerprint = checkoutFingerprint(payload);

  try {
    const raw = sessionStorage.getItem(CHECKOUT_IDEMPOTENCY_STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw) as { fingerprint?: string; key?: string };
      if (
        stored.fingerprint === fingerprint &&
        stored.key &&
        isValidIdempotencyKey(stored.key)
      ) {
        return stored.key;
      }
    }

    const key = crypto.randomUUID();
    sessionStorage.setItem(
      CHECKOUT_IDEMPOTENCY_STORAGE_KEY,
      JSON.stringify({ fingerprint, key }),
    );
    return key;
  } catch {
    return crypto.randomUUID();
  }
}

export function clearCheckoutIdempotencyKey() {
  try {
    sessionStorage.removeItem(CHECKOUT_IDEMPOTENCY_STORAGE_KEY);
  } catch {
    // Ignore storage failures (private mode, disabled storage).
  }
}
