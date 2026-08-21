import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { getRequestIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { User } from "@/models/User";

export async function PATCH(request: Request) {
  try {
    const ip = getRequestIp(request);
    const limited = rateLimit(`account:password:${ip}`, 10, 60_000);
    if (!limited.allowed) return tooManyRequests(limited.retryAfterSec);

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
    }

    const body = (await request.json()) as {
      currentPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    };

    const currentPassword = body.currentPassword ?? "";
    const newPassword = body.newPassword ?? "";
    const confirmPassword = body.confirmPassword ?? "";

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters." },
        { status: 400 },
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        { error: "This account uses Google sign-in. Password changes are not available." },
        { status: 400 },
      );
    }

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password PATCH error:", error);
    return NextResponse.json({ error: "Unable to update password." }, { status: 500 });
  }
}
