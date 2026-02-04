import mongoose from "mongoose";
import { BidStatus, MaterialType } from "@/enums";

const BidSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_cost: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: Object.values(BidStatus),
      default: BidStatus.DRAFT,
    },
    is_template: { type: Boolean, default: false },
    details: [
      {
        description: { type: String, required: true },
        type: { type: String, enum: Object.values(MaterialType) },
        quantity: { type: Number, default: 1 },
        cost: { type: Number, required: true, min: 0 },
      },
    ],
    approved_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.Bid || mongoose.model("Bid", BidSchema);
