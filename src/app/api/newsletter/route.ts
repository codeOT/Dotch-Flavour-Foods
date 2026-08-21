import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { sendNewsletterConfirmation } from "@/lib/email/send";
import { getRequestIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { NewsletterSubscriber } from "@/models/NewsletterSubscriber";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const ip = getRequestIp(request);
    const limited = rateLimit(`newsletter:${ip}`, 8, 60_000);
    if (!limited.allowed) return tooManyRequests(limited.retryAfterSec);

    const body = (await request.json()) as { email?: string; consent?: boolean };
    const email = body.email?.trim().toLowerCase() ?? "";
    const consent = Boolean(body.consent);

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json(
        { error: "Please confirm you want to receive emails from Dotch Flavour Foods." },
        { status: 400 },
      );
    }

    await connectDB();

    const existing = await NewsletterSubscriber.findOne({ email }).lean();
    if (!existing) {
      await NewsletterSubscriber.create({
        email,
        source: "website",
        consentedAt: new Date(),
      });
    }

    const emailResult = await sendNewsletterConfirmation({ to: email });
    if (!emailResult.ok && !emailResult.skipped) {
      console.error("Newsletter confirmation email failed:", emailResult.error);
    }

    return NextResponse.json({
      success: true,
      message:
        "You’re on the list — thank you. We’ll only send launch updates and offers you’ve opted into.",
    });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { error: "Unable to subscribe right now. Please try again." },
      { status: 500 },
    );
  }
}
