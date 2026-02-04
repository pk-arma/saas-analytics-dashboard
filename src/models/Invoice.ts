import mongoose from "mongoose";
import { InvoiceStatus } from "@/enums";

const InvoiceSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    related_bid_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    },
    amount: { type: Number, required: true, min: 0 },
    due_date: { type: Date },
    status: {
      type: String,
      enum: Object.values(InvoiceStatus),
      default: InvoiceStatus.PENDING,
    },
    milestone_id: { type: String }, // Reference to project milestone
    payments: [{ amount: Number, date: Date, reference: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", InvoiceSchema);
