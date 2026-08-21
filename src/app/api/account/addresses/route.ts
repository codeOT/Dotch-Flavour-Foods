import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { accountCacheKey, cacheDelete } from "@/lib/request-cache";
import { User } from "@/models/User";

async function requireUser() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || !mongoose.isValidObjectId(userId)) {
    return { error: NextResponse.json({ error: "Unauthorised." }, { status: 401 }) };
  }
  await connectDB();
  const user = await User.findById(userId);
  if (!user) {
    return { error: NextResponse.json({ error: "Account not found." }, { status: 404 }) };
  }
  return { user, userId };
}

type AddressBody = {
  label?: string;
  fullName?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postcode?: string;
  isDefault?: boolean;
  id?: string;
};

function serializeAddresses(user: InstanceType<typeof User>) {
  return (user.addresses ?? []).map((address) => ({
    id: String(address._id),
    label: address.label || "Home",
    fullName: address.fullName,
    phone: address.phone || "",
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2 || "",
    city: address.city,
    postcode: address.postcode,
    isDefault: Boolean(address.isDefault),
  }));
}

export async function POST(request: Request) {
  try {
    const result = await requireUser();
    if ("error" in result) return result.error;
    const { user, userId } = result;

    const body = (await request.json()) as AddressBody;
    const fullName = body.fullName?.trim() ?? "";
    const addressLine1 = body.addressLine1?.trim() ?? "";
    const city = body.city?.trim() ?? "";
    const postcode = body.postcode?.trim() ?? "";

    if (!fullName || !addressLine1 || !city || !postcode) {
      return NextResponse.json({ error: "Please complete the address fields." }, { status: 400 });
    }

    const isDefault = Boolean(body.isDefault) || (user.addresses?.length ?? 0) === 0;
    if (isDefault) {
      user.addresses?.forEach((address) => {
        address.isDefault = false;
      });
    }

    user.addresses = user.addresses ?? [];
    user.addresses.push({
      label: body.label?.trim() || "Home",
      fullName,
      phone: body.phone?.trim() || undefined,
      addressLine1,
      addressLine2: body.addressLine2?.trim() || undefined,
      city,
      postcode,
      isDefault,
    });

    await user.save();
    cacheDelete(accountCacheKey(userId));
    return NextResponse.json({ addresses: serializeAddresses(user) });
  } catch (error) {
    console.error("Address POST error:", error);
    return NextResponse.json({ error: "Unable to save address." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const result = await requireUser();
    if ("error" in result) return result.error;
    const { user, userId } = result;

    const body = (await request.json()) as AddressBody;
    const id = body.id?.trim() ?? "";
    if (!id || !mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Address not found." }, { status: 404 });
    }

    const address = user.addresses?.id(id);
    if (!address) {
      return NextResponse.json({ error: "Address not found." }, { status: 404 });
    }

    if (body.fullName !== undefined) address.fullName = body.fullName.trim();
    if (body.label !== undefined) address.label = body.label.trim() || "Home";
    if (body.phone !== undefined) address.phone = body.phone.trim() || undefined;
    if (body.addressLine1 !== undefined) address.addressLine1 = body.addressLine1.trim();
    if (body.addressLine2 !== undefined) address.addressLine2 = body.addressLine2.trim() || undefined;
    if (body.city !== undefined) address.city = body.city.trim();
    if (body.postcode !== undefined) address.postcode = body.postcode.trim();

    if (body.isDefault) {
      user.addresses?.forEach((item) => {
        item.isDefault = String(item._id) === id;
      });
    }

    await user.save();
    cacheDelete(accountCacheKey(userId));
    return NextResponse.json({ addresses: serializeAddresses(user) });
  } catch (error) {
    console.error("Address PATCH error:", error);
    return NextResponse.json({ error: "Unable to update address." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const result = await requireUser();
    if ("error" in result) return result.error;
    const { user, userId } = result;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id")?.trim() ?? "";
    if (!id || !mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Address not found." }, { status: 404 });
    }

    const address = user.addresses?.id(id);
    if (!address) {
      return NextResponse.json({ error: "Address not found." }, { status: 404 });
    }

    const wasDefault = Boolean(address.isDefault);
    address.deleteOne();

    if (wasDefault && user.addresses && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();
    cacheDelete(accountCacheKey(userId));
    return NextResponse.json({ addresses: serializeAddresses(user) });
  } catch (error) {
    console.error("Address DELETE error:", error);
    return NextResponse.json({ error: "Unable to delete address." }, { status: 500 });
  }
}
