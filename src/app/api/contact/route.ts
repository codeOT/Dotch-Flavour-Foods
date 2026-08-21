import { NextResponse } from "next/server";
import { sendContactEmails } from "@/lib/email/send";
import { getRequestIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const ip = getRequestIp(request);
    const limited = rateLimit(`contact:${ip}`, 6, 60_000);
    if (!limited.allowed) return tooManyRequests(limited.retryAfterSec);

    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const message = body.message?.trim() ?? "";

    if (name.length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Please enter a longer message." }, { status: 400 });
    }

    const result = await sendContactEmails({ name, email, message });

    if (!result.notifyTeam.ok) {
      if (result.notifyTeam.skipped) {
        return NextResponse.json(
          {
            error:
              "Email is not configured on the server yet. Please WhatsApp us or email hello@dotchflavourfoods.com.",
          },
          { status: 503 },
        );
      }

      return NextResponse.json(
        { error: "Unable to send your message right now. Please try WhatsApp or email us directly." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent. We’ll reply within 1–2 working days.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Unable to send your message. Please try again." },
      { status: 500 },
    );
  }
}
