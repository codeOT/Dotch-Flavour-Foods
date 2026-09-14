import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { isEmailConfigured } from "@/lib/email/client";
import { sendPasswordResetEmail } from "@/lib/email/send";
import { createPasswordResetToken } from "@/lib/password-reset";
import { getRequestIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { getSiteUrl } from "@/lib/sitemap-data";
import { User } from "@/models/User";

const GENERIC_MESSAGE =
  "If an account exists for that email, we've sent password reset instructions. Check your inbox and spam folder.";

export async function POST(request: Request) {
  try {
    const ip = getRequestIp(request);
    const limited = rateLimit(`auth:forgot-password:${ip}`, 5, 60_000);
    if (!limited.allowed) return tooManyRequests(limited.retryAfterSec);

    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase() ?? "";

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (!isEmailConfigured()) {
      return NextResponse.json(
        { error: "Password reset email is not configured yet. Please contact us for help." },
        { status: 503 },
      );
    }

    await connectDB();
    const user = await User.findOne({ email }).select("_id email name firstName passwordHash");

    // Always return the same message to avoid account enumeration.
    if (!user?.passwordHash) {
      return NextResponse.json({ success: true, message: GENERIC_MESSAGE });
    }

    const { token, tokenHash, expiresAt } = createPasswordResetToken();

    // Use native collection write so hot-reloaded/stale schemas cannot strip these fields.
    await User.collection.updateOne(
      { _id: user._id },
      {
        $set: {
          passwordResetTokenHash: tokenHash,
          passwordResetExpires: expiresAt,
        },
      },
    );

    const resetUrl = `${getSiteUrl()}/reset-password?token=${encodeURIComponent(token)}`;
    const emailResult = await sendPasswordResetEmail({
      to: user.email,
      name: user.name || user.firstName || "there",
      resetUrl,
    });

    if (!emailResult.ok) {
      console.error("Password reset email failed:", emailResult.error);
      await User.collection.updateOne(
        { _id: user._id },
        { $unset: { passwordResetTokenHash: "", passwordResetExpires: "" } },
      );
      return NextResponse.json(
        { error: "Unable to send the reset email right now. Please try again shortly." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: GENERIC_MESSAGE });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Unable to process password reset. Please try again." },
      { status: 500 },
    );
  }
}
