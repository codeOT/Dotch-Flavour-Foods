import { Schema, models, model, type InferSchemaType, type Model } from "mongoose";

export const PRODUCT_CATEGORIES = ["fresh-food", "ready-soup"] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

const productSchema = new Schema(
  {
    category: {
      type: String,
      enum: PRODUCT_CATEGORIES,
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true, index: true },
    description: { type: String, required: true, trim: true },
    shortDescription: { type: String, trim: true },
    tagline: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    size: { type: String, trim: true },
    image: { type: String, required: true, trim: true },
    ingredients: { type: [String], default: [] },
    allergens: { type: [String], default: [] },
    mayContain: { type: [String], default: [] },
    servingSuggestions: { type: [String], default: [] },
    storageInstructions: { type: String, trim: true },
    heatingInstructions: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

productSchema.index({ category: 1, slug: 1 }, { unique: true });

export type ProductDocument = InferSchemaType<typeof productSchema> & {
  _id: Schema.Types.ObjectId;
};

export const Product: Model<ProductDocument> =
  (models.Product as Model<ProductDocument>) ||
  model<ProductDocument>("Product", productSchema);
