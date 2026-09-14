import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { hashPasswordResetToken } from "@/lib/password-reset";
import { getRequestIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    const ip = getRequestIp(request);
    const limited = rateLimit(`auth:reset-password:${ip}`, 10, 60_000);
    if (!limited.allowed) return tooManyRequests(limited.retryAfterSec);

    const body = (await request.json()) as {
      token?: string;
      password?: string;
      confirmPassword?: string;
    };

    const token = body.token?.trim() ?? "";
    const password = body.password ?? "";
    const confirmPassword = body.confirmPassword ?? "";

    if (!token) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    await connectDB();

    const tokenHash = hashPasswordResetToken(token);
    const now = new Date();

    // Read via the native collection so we are not blocked by a stale schema cache.
    const rawUser = await User.collection.findOne({
      passwordResetTokenHash: tokenHash,
      passwordResetExpires: { $gt: now },
    });

    if (!rawUser?._id) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired. Request a new one." },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const unset: Record<string, string> = {
      passwordResetTokenHash: "",
      passwordResetExpires: "",
    };
    const set: Record<string, unknown> = { passwordHash };

    if (rawUser.provider === "google") {
      set.provider = "credentials";
    }

    await User.collection.updateOne(
      { _id: rawUser._id },
      {
        $set: set,
        $unset: unset,
      },
    );

    return NextResponse.json({
      success: true,
      message: "Your password has been updated. You can sign in now.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Unable to reset password. Please try again." },
      { status: 500 },
    );
  }
}
