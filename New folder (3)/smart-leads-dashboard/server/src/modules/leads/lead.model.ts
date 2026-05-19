import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: "Website" | "Instagram" | "Referral";
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: String,
    email: String,
    status: { type: String, enum: ["New", "Contacted", "Qualified", "Lost"], default: "New" },
    source: { type: String, enum: ["Website", "Instagram", "Referral"] },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export const Lead = mongoose.model<ILead>("Lead", leadSchema);