import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/admin";
import { PRODUCT_CATEGORIES, Product, type ProductCategory } from "@/models/Product";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function serializeProduct(product: {
  _id: { toString(): string };
  category: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string | null;
  tagline?: string | null;
  price: number;
  size?: string | null;
  image: string;
  ingredients?: string[] | null;
  allergens?: string[] | null;
  mayContain?: string[] | null;
  servingSuggestions?: string[] | null;
  storageInstructions?: string | null;
  heatingInstructions?: string | null;
  isActive?: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  return {
    id: product._id.toString(),
    category: product.category,
    name: product.name,
    slug: product.slug,
    description: product.description,
    shortDescription: product.shortDescription ?? "",
    tagline: product.tagline ?? "",
    price: product.price,
    size: product.size ?? "",
    image: product.image,
    ingredients: product.ingredients ?? [],
    allergens: product.allergens ?? [],
    mayContain: product.mayContain ?? [],
    servingSuggestions: product.servingSuggestions ?? [],
    storageInstructions: product.storageInstructions ?? "",
    heatingInstructions: product.heatingInstructions ?? "",
    isActive: product.isActive ?? true,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

export async function GET(request: Request) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category");
    const filter: { category?: ProductCategory } =
      categoryParam && PRODUCT_CATEGORIES.includes(categoryParam as ProductCategory)
        ? { category: categoryParam as ProductCategory }
        : {};

    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      products: products.map((product) => serializeProduct(product)),
    });
  } catch (error) {
    console.error("Admin products list error:", error);
    return NextResponse.json({ error: "Unable to load products." }, { status: 500 });
  }
}

type CreatePayload = {
  category?: string;
  name?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  tagline?: string;
  price?: number | string;
  size?: string;
  image?: string;
  ingredients?: string | string[];
  allergens?: string | string[];
  mayContain?: string | string[];
  servingSuggestions?: string | string[];
  storageInstructions?: string;
  heatingInstructions?: string;
  isActive?: boolean;
};

export async function POST(request: Request) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    }

    const body = (await request.json()) as CreatePayload;
    const category = body.category?.trim() as ProductCategory | undefined;
    const name = body.name?.trim() ?? "";
    const description = body.description?.trim() ?? "";
    const image = body.image?.trim() ?? "";
    const price = Number(body.price);
    const slug = slugify(body.slug?.trim() || name);

    if (!category || !PRODUCT_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: "Category must be fresh-food or ready-soup." },
        { status: 400 },
      );
    }

    if (!name || !description || !image || !slug) {
      return NextResponse.json(
        { error: "Name, description, and image are required." },
        { status: 400 },
      );
    }

    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json({ error: "A valid price is required." }, { status: 400 });
    }

    if (category === "ready-soup") {
      const tagline = body.tagline?.trim() ?? "";
      const shortDescription = body.shortDescription?.trim() || description;
      if (!tagline) {
        return NextResponse.json(
          { error: "Tagline is required for ready soups." },
          { status: 400 },
        );
      }
      if (!body.size?.trim()) {
        return NextResponse.json(
          { error: "Size is required for ready soups (e.g. 1000ml or 2L)." },
          { status: 400 },
        );
      }
      if (!body.storageInstructions?.trim() || !body.heatingInstructions?.trim()) {
        return NextResponse.json(
          { error: "Storage and heating instructions are required for ready soups." },
          { status: 400 },
        );
      }

      await connectDB();

      const existing = await Product.findOne({ category, slug });
      if (existing) {
        return NextResponse.json(
          { error: "A ready soup with this slug already exists." },
          { status: 409 },
        );
      }

      const product = await Product.create({
        category,
        name,
        slug,
        description,
        shortDescription,
        tagline,
        price,
        size: body.size.trim(),
        image,
        ingredients: parseList(body.ingredients),
        allergens: parseList(body.allergens),
        mayContain: parseList(body.mayContain),
        servingSuggestions: parseList(body.servingSuggestions),
        storageInstructions: body.storageInstructions.trim(),
        heatingInstructions: body.heatingInstructions.trim(),
        isActive: body.isActive !== false,
      });

      return NextResponse.json({ product: serializeProduct(product) }, { status: 201 });
    }

    await connectDB();

    const existing = await Product.findOne({ category, slug });
    if (existing) {
      return NextResponse.json(
        { error: "A fresh food item with this slug already exists." },
        { status: 409 },
      );
    }

    const product = await Product.create({
      category,
      name,
      slug,
      description,
      price,
      image,
      isActive: body.isActive !== false,
    });

    return NextResponse.json({ product: serializeProduct(product) }, { status: 201 });
  } catch (error) {
    console.error("Admin product create error:", error);
    return NextResponse.json({ error: "Unable to create product." }, { status: 500 });
  }
}
