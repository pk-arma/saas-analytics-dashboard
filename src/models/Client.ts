import mongoose from "mongoose";
import { ClientStatus, CommunicationType } from "@/enums";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  role: { type: String },
});

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    contacts: [ContactSchema],
    status: {
      type: String,
      enum: Object.values(ClientStatus),
      default: ClientStatus.LEAD,
    },
    communication_history: [
      {
        type: { type: String, enum: Object.values(CommunicationType) },
        date: { type: Date, default: Date.now },
        notes: { type: String },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);
