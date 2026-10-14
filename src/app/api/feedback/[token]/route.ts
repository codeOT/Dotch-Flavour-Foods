import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import {
  FEEDBACK_COMMENT_MAX,
  FEEDBACK_COMMENT_MIN,
  formatDisplayName,
} from "@/lib/feedback";
import { getRequestIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { Feedback } from "@/models/Feedback";
import { Order } from "@/models/Order";

type RouteContext = {
  params: Promise<{ token: string }>;
};

function serializeFeedback(doc: {
  displayName: string;
  location?: string | null;
  rating: number;
  comment: string;
  published: boolean;
}) {
  return {
    submitted: true as const,
    displayName: doc.displayName,
    location: doc.location ?? "",
    rating: doc.rating,
    comment: doc.comment,
    published: doc.published,
  };
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { token: rawToken } = await context.params;
    const token = rawToken?.trim() ?? "";
    if (!token || token.length < 16) {
      return NextResponse.json({ error: "Feedback link not found." }, { status: 404 });
    }

    await connectDB();
    const order = await Order.findOne({ feedbackToken: token });
    if (!order) {
      return NextResponse.json({ error: "Feedback link not found." }, { status: 404 });
    }

    const existing = await Feedback.findOne({ orderNumber: order.orderNumber });
    if (existing) {
      return NextResponse.json({
        orderNumber: order.orderNumber,
        ...serializeFeedback(existing),
      });
    }

    return NextResponse.json({
      submitted: false,
      orderNumber: order.orderNumber,
      displayName: formatDisplayName(order.fullName),
      location: order.city?.trim() ?? "",
    });
  } catch (error) {
    console.error("Feedback GET error:", error);
    return NextResponse.json({ error: "Unable to load feedback form." }, { status: 500 });
  }
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const ip = getRequestIp(request);
    const limited = rateLimit(`feedback:${ip}`, 8, 60_000);
    if (!limited.allowed) {
      return tooManyRequests(limited.retryAfterSec, "Please wait a moment and try again.");
    }

    const { token: rawToken } = await context.params;
    const token = rawToken?.trim() ?? "";
    if (!token || token.length < 16) {
      return NextResponse.json({ error: "Feedback link not found." }, { status: 404 });
    }

    const body = (await request.json()) as {
      rating?: number;
      comment?: string;
      displayName?: string;
      location?: string;
    };

    const rating = Number(body.rating);
    const comment = body.comment?.trim() ?? "";
    const displayName = body.displayName?.trim() ?? "";
    const location = body.location?.trim() ?? "";

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Please choose a rating from 1 to 5 stars." }, { status: 400 });
    }

    if (comment.length < FEEDBACK_COMMENT_MIN) {
      return NextResponse.json(
        { error: `Please write at least ${FEEDBACK_COMMENT_MIN} characters.` },
        { status: 400 },
      );
    }

    if (comment.length > FEEDBACK_COMMENT_MAX) {
      return NextResponse.json(
        { error: `Please keep feedback under ${FEEDBACK_COMMENT_MAX} characters.` },
        { status: 400 },
      );
    }

    if (displayName.length < 2 || displayName.length > 80) {
      return NextResponse.json({ error: "Please enter the name to show with your review." }, { status: 400 });
    }

    if (location.length > 80) {
      return NextResponse.json({ error: "Location is too long." }, { status: 400 });
    }

    await connectDB();
    const order = await Order.findOne({ feedbackToken: token });
    if (!order) {
      return NextResponse.json({ error: "Feedback link not found." }, { status: 404 });
    }

    const existing = await Feedback.findOne({ orderNumber: order.orderNumber });
    if (existing) {
      return NextResponse.json({
        orderNumber: order.orderNumber,
        ...serializeFeedback(existing),
      });
    }

    const created = await Feedback.create({
      orderNumber: order.orderNumber,
      orderId: String(order._id),
      email: order.email,
      customerName: order.fullName,
      displayName,
      location,
      rating,
      comment,
      published: false,
    });

    if (!order.feedbackEmailSentAt) {
      order.feedbackEmailSentAt = new Date();
      await order.save();
    }

    return NextResponse.json({
      orderNumber: order.orderNumber,
      ...serializeFeedback(created),
    });
  } catch (error) {
    console.error("Feedback POST error:", error);
    return NextResponse.json({ error: "Unable to save your feedback." }, { status: 500 });
  }
}
