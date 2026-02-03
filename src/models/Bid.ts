import mongoose from "mongoose";
import { BidStatus } from "@/enums";

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
    details: [
      {
        description: { type: String, required: true },
        cost: { type: Number, required: true, min: 0 },
      },
    ],
    approved_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

export default mongoose.models.Bid ||
  mongoose.model("Bid", BidSchema);
