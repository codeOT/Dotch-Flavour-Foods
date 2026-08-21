import { Schema, models, model, type InferSchemaType, type Model } from "mongoose";

const newsletterSubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    source: { type: String, default: "website" },
    consentedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export type NewsletterSubscriberDocument = InferSchemaType<typeof newsletterSubscriberSchema> & {
  _id: Schema.Types.ObjectId;
};

export const NewsletterSubscriber: Model<NewsletterSubscriberDocument> =
  (models.NewsletterSubscriber as Model<NewsletterSubscriberDocument>) ||
  model<NewsletterSubscriberDocument>("NewsletterSubscriber", newsletterSubscriberSchema);
