import mongoose from "mongoose";
import { CommunicationType } from "@/enums";

const CommunicationSchema = new mongoose.Schema(
    {
        client_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(CommunicationType),
            required: true,
        },
        notes: { type: String, required: true },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: { type: Date, default: Date.now },
    },
    { timestamps: { createdAt: "created_at", updatedAt: false } }
);

export default mongoose.models.Communication ||
    mongoose.model("Communication", CommunicationSchema);
