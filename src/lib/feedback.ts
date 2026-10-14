import { randomBytes } from "node:crypto";
import { connectDB } from "@/lib/db";
import { sendFeedbackRequestEmail } from "@/lib/email/send";
import { type PublicReview } from "@/lib/feedback-constants";
import { Feedback } from "@/models/Feedback";
import { Order } from "@/models/Order";

export {
  FEEDBACK_COMMENT_MAX,
  FEEDBACK_COMMENT_MIN,
  formatDisplayName,
  type PublicReview,
} from "@/lib/feedback-constants";

export function createFeedbackToken() {
  return randomBytes(32).toString("hex");
}

export function toPublicReview(doc: {
  _id: { toString(): string };
  displayName: string;
  location?: string | null;
  rating: number;
  comment: string;
}): PublicReview {
  return {
    id: doc._id.toString(),
    name: doc.displayName,
    location: doc.location?.trim() ?? "",
    rating: doc.rating,
    quote: doc.comment,
  };
}

export async function getPublishedReviews(limit = 12): Promise<PublicReview[]> {
  try {
    await connectDB();
    const rows = await Feedback.find({ published: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    return rows.map((row) =>
      toPublicReview({
        _id: row._id,
        displayName: row.displayName,
        location: row.location,
        rating: row.rating,
        comment: row.comment,
      }),
    );
  } catch (error) {
    console.error("Published reviews load error:", error);
    return [];
  }
}

export async function sendFeedbackInviteForOrder(orderNumber: string) {
  await connectDB();
  const order = await Order.findOne({ orderNumber });
  if (!order) {
    return { ok: false as const, error: "Order not found.", status: 404 };
  }

  if (order.status === "pending" || order.status === "failed" || order.status === "cancelled") {
    return {
      ok: false as const,
      error: "Feedback mail can only be sent for paid or delivered orders.",
      status: 400,
    };
  }

  if (!order.email) {
    return { ok: false as const, error: "This order has no customer email.", status: 400 };
  }

  const existing = await Feedback.findOne({ orderNumber: order.orderNumber }).select("_id").lean();
  if (existing) {
    return {
      ok: false as const,
      error: "This customer already submitted feedback for this order.",
      status: 409,
    };
  }

  if (!order.feedbackToken) {
    order.feedbackToken = createFeedbackToken();
  }

  const result = await sendFeedbackRequestEmail({
    to: order.email,
    fullName: order.fullName,
    orderNumber: order.orderNumber,
    token: order.feedbackToken,
    idempotencyKey: `feedback-invite-${order.orderNumber}-${Date.now()}`,
  });

  if (!result.ok) {
    return {
      ok: false as const,
      error: result.error ?? "Unable to send the feedback email.",
      status: 502,
    };
  }

  order.feedbackEmailSentAt = new Date();
  await order.save();

  return {
    ok: true as const,
    orderNumber: order.orderNumber,
    email: order.email,
    feedbackEmailSentAt: order.feedbackEmailSentAt.toISOString(),
  };
}
