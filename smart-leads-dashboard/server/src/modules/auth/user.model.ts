import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "sales";
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "sales"], default: "sales" }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const User = mongoose.model<IUser>("User", userSchema);