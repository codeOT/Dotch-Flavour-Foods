import { Schema, models, model, type InferSchemaType, type Model } from "mongoose";

const feedbackSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    customerName: { type: String, required: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    location: { type: String, trim: true, default: "" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, maxlength: 800 },
    published: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

feedbackSchema.index({ published: 1, publishedAt: -1 });

export type FeedbackDocument = InferSchemaType<typeof feedbackSchema> & {
  _id: Schema.Types.ObjectId;
};

export const Feedback: Model<FeedbackDocument> =
  (models.Feedback as Model<FeedbackDocument>) ||
  model<FeedbackDocument>("Feedback", feedbackSchema);
