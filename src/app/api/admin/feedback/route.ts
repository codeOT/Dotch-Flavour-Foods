import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/admin";
import { connectDB } from "@/lib/db";
import { Feedback } from "@/models/Feedback";

export async function GET(request: Request) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    }

    await connectDB();
    const rows = await Feedback.find().sort({ createdAt: -1 }).limit(200).lean();

    return NextResponse.json({
      feedback: rows.map((row) => ({
        id: row._id.toString(),
        orderNumber: row.orderNumber,
        email: row.email,
        customerName: row.customerName,
        displayName: row.displayName,
        location: row.location ?? "",
        rating: row.rating,
        comment: row.comment,
        published: row.published,
        publishedAt: row.publishedAt?.toISOString() ?? null,
        createdAt: row.createdAt?.toISOString() ?? null,
      })),
    });
  } catch (error) {
    console.error("Admin feedback list error:", error);
    return NextResponse.json({ error: "Unable to load feedback." }, { status: 500 });
  }
}
