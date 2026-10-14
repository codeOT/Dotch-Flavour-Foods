import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/admin";
import { connectDB } from "@/lib/db";
import { Feedback } from "@/models/Feedback";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    }

    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid feedback id." }, { status: 400 });
    }

    const body = (await request.json()) as { published?: boolean };
    if (typeof body.published !== "boolean") {
      return NextResponse.json({ error: "published must be true or false." }, { status: 400 });
    }

    await connectDB();
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return NextResponse.json({ error: "Feedback not found." }, { status: 404 });
    }

    feedback.published = body.published;
    feedback.publishedAt = body.published ? new Date() : null;
    await feedback.save();

    return NextResponse.json({
      feedback: {
        id: feedback._id.toString(),
        published: feedback.published,
        publishedAt: feedback.publishedAt?.toISOString() ?? null,
      },
    });
  } catch (error) {
    console.error("Admin feedback update error:", error);
    return NextResponse.json({ error: "Unable to update feedback." }, { status: 500 });
  }
}
