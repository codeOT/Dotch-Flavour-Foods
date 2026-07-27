import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/admin";
import { Product } from "@/models/Product";
import mongoose from "mongoose";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    }

    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
    }

    await connectDB();
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin product delete error:", error);
    return NextResponse.json({ error: "Unable to delete product." }, { status: 500 });
  }
}
