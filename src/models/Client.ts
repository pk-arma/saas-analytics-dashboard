import mongoose from "mongoose";
import { CommonStatus } from "@/enums";

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    contacts: [{ type: String }],
    status: {
      type: String,
      enum: Object.values(CommonStatus),
      default: CommonStatus.ACTIVE,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

export default mongoose.models.Client ||
  mongoose.model("Client", ClientSchema);
