import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import {
  ACCOUNT_CACHE_TTL_MS,
  accountCacheKey,
  cacheDelete,
  cacheGet,
  cacheSet,
} from "@/lib/request-cache";
import { getRequestIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { joinFullName, User } from "@/models/User";

type LeanAddress = {
  _id?: { toString(): string };
  label?: string | null;
  fullName: string;
  phone?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  postcode: string;
  isDefault?: boolean | null;
};

type LeanUser = {
  _id: { toString(): string };
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  email: string;
  phone?: string | null;
  provider?: string | null;
  newsletter?: {
    offers?: boolean | null;
    recipes?: boolean | null;
    events?: boolean | null;
  } | null;
  addresses?: LeanAddress[] | null;
};

function serializeUser(user: LeanUser) {
  const firstName =
    user.firstName ||
    (user.name ? user.name.trim().split(/\s+/)[0] : "") ||
    "";
  const lastName =
    user.lastName ||
    (user.name ? user.name.trim().split(/\s+/).slice(1).join(" ") : "") ||
    "";

  return {
    id: String(user._id),
    name: user.name,
    firstName,
    lastName,
    username: user.username || "",
    email: user.email,
    phone: user.phone || "",
    provider: user.provider,
    newsletter: {
      offers: Boolean(user.newsletter?.offers),
      recipes: Boolean(user.newsletter?.recipes),
      events: Boolean(user.newsletter?.events),
    },
    addresses: (user.addresses ?? []).map((address) => ({
      id: String(address._id),
      label: address.label || "Home",
      fullName: address.fullName,
      phone: address.phone || "",
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      postcode: address.postcode,
      isDefault: Boolean(address.isDefault),
    })),
  };
}

async function requireSessionUserId() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || !mongoose.isValidObjectId(userId)) {
    return { error: NextResponse.json({ error: "Unauthorised." }, { status: 401 }) };
  }
  return { userId };
}

export async function GET(request: Request) {
  try {
    const ip = getRequestIp(request);
    const limited = rateLimit(`account:profile:get:${ip}`, 90, 60_000);
    if (!limited.allowed) return tooManyRequests(limited.retryAfterSec);

    const sessionResult = await requireSessionUserId();
    if ("error" in sessionResult) return sessionResult.error;
    const { userId } = sessionResult;

    const cacheKey = accountCacheKey(userId);
    const cached = cacheGet<{ user: ReturnType<typeof serializeUser> }>(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          "Cache-Control": "private, max-age=10, stale-while-revalidate=30",
          "X-Cache": "HIT",
        },
      });
    }

    await connectDB();
    const user = await User.findById(userId)
      .select("name firstName lastName username email phone provider newsletter addresses")
      .lean<LeanUser | null>();

    if (!user) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }

    const payload = { user: serializeUser(user) };
    cacheSet(cacheKey, payload, ACCOUNT_CACHE_TTL_MS);

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "private, max-age=10, stale-while-revalidate=30",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("Account profile GET error:", error);
    return NextResponse.json({ error: "Unable to load account." }, { status: 500 });
  }
}

type ProfileBody = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  username?: string;
};

export async function PATCH(request: Request) {
  try {
    const ip = getRequestIp(request);
    const limited = rateLimit(`account:profile:patch:${ip}`, 30, 60_000);
    if (!limited.allowed) return tooManyRequests(limited.retryAfterSec);

    const sessionResult = await requireSessionUserId();
    if ("error" in sessionResult) return sessionResult.error;
    const { userId } = sessionResult;

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }

    const body = (await request.json()) as ProfileBody;
    const firstName = body.firstName?.trim() ?? user.firstName ?? "";
    const lastName = body.lastName?.trim() ?? user.lastName ?? "";
    const phone = body.phone?.trim() ?? user.phone ?? "";
    const username = body.username?.trim().toLowerCase();

    if (firstName.length < 1) {
      return NextResponse.json({ error: "Please enter your first name." }, { status: 400 });
    }

    if (username) {
      if (!/^[a-z0-9._-]{3,24}$/.test(username)) {
        return NextResponse.json(
          {
            error:
              "Username must be 3–24 characters and use letters, numbers, dots, underscores or hyphens.",
          },
          { status: 400 },
        );
      }
      const taken = await User.exists({
        username,
        _id: { $ne: user._id },
      });
      if (taken) {
        return NextResponse.json({ error: "That username is already taken." }, { status: 409 });
      }
      user.username = username;
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.name = joinFullName(firstName, lastName) || user.name;
    user.phone = phone || undefined;

    await user.save();
    cacheDelete(accountCacheKey(userId));

    return NextResponse.json({ user: serializeUser(user.toObject() as LeanUser) });
  } catch (error) {
    console.error("Account profile PATCH error:", error);
    return NextResponse.json({ error: "Unable to save details." }, { status: 500 });
  }
}
