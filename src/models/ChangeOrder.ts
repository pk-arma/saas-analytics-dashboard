import mongoose from "mongoose";

const ChangeOrderSchema = new mongoose.Schema(
    {
        project_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        cost_impact: { type: Number, default: 0 },
        schedule_impact_days: { type: Number, default: 0 },
        status: {
            type: String,
            enum: ["draft", "pending", "approved", "rejected"],
            default: "draft",
        },
        requested_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        approved_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        approval_date: { type: Date },
    },
    { timestamps: true }
);

export default mongoose.models.ChangeOrder ||
    mongoose.model("ChangeOrder", ChangeOrderSchema);
