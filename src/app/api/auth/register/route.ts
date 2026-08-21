import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/email/send";
import { getRequestIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { splitFullName, User, usernameFromEmail } from "@/models/User";

type RegisterBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const ip = getRequestIp(request);
    const limited = rateLimit(`auth:register:${ip}`, 8, 60_000);
    if (!limited.allowed) return tooManyRequests(limited.retryAfterSec);

    const body = (await request.json()) as RegisterBody;

    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const phone = body.phone?.trim() ?? "";
    const password = body.password ?? "";
    const confirmPassword = body.confirmPassword ?? "";

    if (fullName.length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
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

    const existing = await User.exists({ email });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const { firstName, lastName } = splitFullName(fullName);

    let username = usernameFromEmail(email);
    if (await User.exists({ username })) {
      username = `${username}${Math.floor(Math.random() * 900 + 100)}`;
    }

    const user = await User.create({
      name: fullName,
      firstName,
      lastName: lastName || undefined,
      username,
      email,
      phone: phone || undefined,
      passwordHash,
      provider: "credentials",
    });

    const welcome = await sendWelcomeEmail({ to: email, name: fullName });
    if (!welcome.ok && !welcome.skipped) {
      console.error("Welcome email failed:", welcome.error);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Unable to create account. Please try again." },
      { status: 500 },
    );
  }
}
