import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getRequestIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { maskEmail, User } from "@/models/User";

type ForgotUsernameBody = {
  email?: string;
  phone?: string;
};

function normalizePhone(value: string) {
  return value.replace(/[\s()-]/g, "");
}

export async function POST(request: Request) {
  try {
    const ip = getRequestIp(request);
    const limited = rateLimit(`auth:forgot-username:${ip}`, 8, 60_000);
    if (!limited.allowed) return tooManyRequests(limited.retryAfterSec);

    const body = (await request.json()) as ForgotUsernameBody;
    const email = body.email?.trim().toLowerCase() ?? "";
    const phone = normalizePhone(body.phone?.trim() ?? "");

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Enter the email or phone number on your account." },
        { status: 400 },
      );
    }

    await connectDB();

    let user = null;
    if (email) {
      user = await User.findOne({ email }).select("username email").lean();
    } else if (phone) {
      // Match common stored formats without scanning the whole collection.
      user = await User.findOne({
        $or: [
          { phone },
          { phone: body.phone?.trim() },
          { phone: { $regex: `${phone.replace(/^\+/, "\\+?")}$` } },
        ],
      })
        .select("username email phone")
        .lean();

      if (user && normalizePhone(user.phone || "") !== phone) {
        user = null;
      }
    }

    if (!user) {
      return NextResponse.json({
        found: false,
        message:
          "We could not find an account with those details. Try another email or phone number, or contact us for help.",
      });
    }

    const username = user.username || user.email.split("@")[0];

    return NextResponse.json({
      found: true,
      username,
      emailHint: maskEmail(user.email),
      message: `Your username is “${username}”. Sign in with your email (${maskEmail(user.email)}) and password.`,
    });
  } catch (error) {
    console.error("Forgot username error:", error);
    return NextResponse.json(
      { error: "Unable to look up your username. Please try again." },
      { status: 500 },
    );
  }
}
