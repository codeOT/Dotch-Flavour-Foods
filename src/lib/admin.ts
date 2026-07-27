import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const ADMIN_COOKIE_NAME = "dt_admin_session";
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 12;
const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ??
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  "";

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return adminEmails.includes(email.trim().toLowerCase());
}

/** Server-only: valid admin portal session (not customer NextAuth). */
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return readAdminFromToken(token);
}

function toBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signSessionPayload(payload: string) {
  return createHmac("sha256", ADMIN_SESSION_SECRET).update(payload).digest("base64url");
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}

export function getAdminSessionTtlSeconds() {
  return ADMIN_SESSION_TTL_SECONDS;
}

export function getAdminPassword() {
  return process.env.ADMIN_LOGIN_PASSWORD ?? "";
}

export function createAdminSessionToken(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const expiresAt = Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000;
  const payload = `${normalizedEmail}|${expiresAt}`;
  const signature = signSessionPayload(payload);
  return `${toBase64Url(normalizedEmail)}.${expiresAt}.${signature}`;
}

export function readAdminFromToken(token?: string | null) {
  if (!token || !ADMIN_SESSION_SECRET) {
    return null;
  }

  const [encodedEmail, expiresAtRaw, signature] = token.split(".");
  if (!encodedEmail || !expiresAtRaw || !signature) {
    return null;
  }

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return null;
  }

  let email = "";
  try {
    email = fromBase64Url(encodedEmail).trim().toLowerCase();
  } catch {
    return null;
  }

  if (!isAdminEmail(email)) {
    return null;
  }

  const payload = `${email}|${expiresAt}`;
  const expected = signSessionPayload(payload);
  const provided = signature;

  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);
  if (expectedBuffer.length !== providedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(expectedBuffer, providedBuffer)) {
    return null;
  }

  return { email };
}

export function getAdminFromRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const parts = cookieHeader.split(";").map((part) => part.trim());
  const sessionPair = parts.find((part) => part.startsWith(`${ADMIN_COOKIE_NAME}=`));
  if (!sessionPair) {
    return null;
  }

  const token = sessionPair.slice(`${ADMIN_COOKIE_NAME}=`.length);
  return readAdminFromToken(token);
}
