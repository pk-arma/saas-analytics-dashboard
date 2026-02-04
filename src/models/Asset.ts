import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true }, // e.g., Excavator, Power Tool, Vehicle
        serial_number: { type: String, unique: true },
        status: {
            type: String,
            enum: ["available", "in_use", "maintenance", "retired"],
            default: "available",
        },
        current_project_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
        assigned_user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        maintenance_log: [
            {
                date: { type: Date, default: Date.now },
                description: { type: String },
                cost: { type: Number },
                performed_by: { type: String },
            },
        ],
        next_service_date: { type: Date },
        purchase_data: {
            date: { type: Date },
            price: { type: Number },
        },
    },
    { timestamps: true }
);

export default mongoose.models.Asset ||
    mongoose.model("Asset", AssetSchema);
