import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/admin";
import { sendFeedbackInviteForOrder } from "@/lib/feedback";

export async function POST(
  request: Request,
  context: { params: Promise<{ orderNumber: string }> },
) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    }

    const { orderNumber: rawOrderNumber } = await context.params;
    const orderNumber = decodeURIComponent(rawOrderNumber || "").trim();
    if (!orderNumber) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const result = await sendFeedbackInviteForOrder(orderNumber);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({
      ok: true,
      orderNumber: result.orderNumber,
      email: result.email,
      feedbackEmailSentAt: result.feedbackEmailSentAt,
    });
  } catch (error) {
    console.error("Admin feedback invite error:", error);
    return NextResponse.json({ error: "Unable to send feedback email." }, { status: 500 });
  }
}
