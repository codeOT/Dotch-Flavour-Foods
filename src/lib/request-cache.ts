type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

declare global {
  var __dotchRequestCache: Map<string, CacheEntry<unknown>> | undefined;
}

const store: Map<string, CacheEntry<unknown>> =
  global.__dotchRequestCache ?? new Map<string, CacheEntry<unknown>>();
global.__dotchRequestCache = store;

/**
 * Short-lived in-memory cache for hot authenticated reads
 * (profile / orders) within a warm serverless instance.
 */
export function cacheGet<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value as T;
}

export function cacheSet<T>(key: string, value: T, ttlMs: number) {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
}

export function cacheDelete(key: string) {
  store.delete(key);
}

export function cacheDeletePrefix(prefix: string) {
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key);
  }
}

export const ACCOUNT_CACHE_TTL_MS = 15_000;
export const ORDERS_CACHE_TTL_MS = 20_000;

export function accountCacheKey(userId: string) {
  return `account:profile:${userId}`;
}

export function ordersCacheKey(userId: string, email?: string | null) {
  return `orders:${userId}:${(email || "").toLowerCase()}`;
}
