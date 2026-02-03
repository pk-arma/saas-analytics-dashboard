import mongoose from "mongoose";
import { UserRole } from "@/enums";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    password_hash: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
