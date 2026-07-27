import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import {
  createAdminSessionToken,
  getAdminCookieName,
  getAdminPassword,
  getAdminSessionTtlSeconds,
  isAdminEmail,
} from "@/lib/admin";

type LoginPayload = {
  email?: string;
  password?: string;
};

function passwordsMatch(provided: string, expected: string) {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }
  return timingSafeEqual(providedBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginPayload;
    const email = body.email?.trim().toLowerCase() ?? "";
    const password = body.password ?? "";
    const adminPassword = getAdminPassword();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    if (!adminPassword) {
      return NextResponse.json(
        { error: "Admin login is not configured. Add ADMIN_LOGIN_PASSWORD." },
        { status: 500 },
      );
    }

    // Customer accounts (NextAuth) never grant admin access — only allowlisted emails
    // with the separate ADMIN_LOGIN_PASSWORD can enter the admin portal.
    if (!isAdminEmail(email) || !passwordsMatch(password, adminPassword)) {
      return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
    }

    const token = createAdminSessionToken(email);
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: getAdminCookieName(),
      value: token,
      maxAge: getAdminSessionTtlSeconds(),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Unable to process admin login." }, { status: 500 });
  }
}
