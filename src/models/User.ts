import { Schema, models, model, type InferSchemaType, type Model } from "mongoose";

const addressSchema = new Schema(
  {
    label: { type: String, default: "Home", trim: true },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    addressLine1: { type: String, required: true, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    postcode: { type: String, required: true, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true },
);

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    username: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String },
    passwordResetTokenHash: { type: String, index: true },
    passwordResetExpires: { type: Date },
    image: { type: String },
    phone: { type: String, trim: true, index: true },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    addresses: { type: [addressSchema], default: [] },
    newsletter: {
      offers: { type: Boolean, default: false },
      recipes: { type: Boolean, default: false },
      events: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema> & {
  _id: Schema.Types.ObjectId;
};

const USER_MODEL = "User";

function getUserModel(): Model<UserDocument> {
  const existing = models[USER_MODEL] as Model<UserDocument> | undefined;
  if (existing) {
    // Hot reload can keep a stale schema without newly added paths.
    if (!existing.schema.path("passwordResetTokenHash")) {
      existing.schema.add({
        passwordResetTokenHash: { type: String, index: true },
        passwordResetExpires: { type: Date },
      });
    }
    return existing;
  }
  return model<UserDocument>(USER_MODEL, userSchema);
}

export const User = getUserModel();

export function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

export function joinFullName(firstName: string, lastName: string) {
  return [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");
}

export function usernameFromEmail(email: string) {
  const local = email.split("@")[0]?.toLowerCase().replace(/[^a-z0-9._-]/g, "") ?? "";
  return local.slice(0, 24) || `user${Date.now().toString(36)}`;
}

export function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  if (local.length <= 2) return `${local[0] ?? "*"}***@${domain}`;
  return `${local.slice(0, 2)}***@${domain}`;
}
