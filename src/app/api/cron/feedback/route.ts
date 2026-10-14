import { NextResponse } from "next/server";
import { sendDueFeedbackInvites } from "@/lib/feedback";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  const auth = request.headers.get("authorization")?.trim();
  return auth === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  try {
    const result = await sendDueFeedbackInvites();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("Feedback cron error:", error);
    return NextResponse.json({ error: "Unable to send feedback emails." }, { status: 500 });
  }
}
