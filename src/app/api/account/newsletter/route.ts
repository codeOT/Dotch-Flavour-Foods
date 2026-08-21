import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { accountCacheKey, cacheDelete } from "@/lib/request-cache";
import { User } from "@/models/User";

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
    }

    const body = (await request.json()) as {
      offers?: boolean;
      recipes?: boolean;
      events?: boolean;
    };

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }

    user.newsletter = {
      offers: Boolean(body.offers),
      recipes: Boolean(body.recipes),
      events: Boolean(body.events),
    };
    await user.save();
    cacheDelete(accountCacheKey(userId));

    return NextResponse.json({
      newsletter: {
        offers: Boolean(user.newsletter?.offers),
        recipes: Boolean(user.newsletter?.recipes),
        events: Boolean(user.newsletter?.events),
      },
    });
  } catch (error) {
    console.error("Newsletter PATCH error:", error);
    return NextResponse.json({ error: "Unable to save newsletter preferences." }, { status: 500 });
  }
}
