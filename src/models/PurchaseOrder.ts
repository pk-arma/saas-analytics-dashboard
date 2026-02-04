import mongoose from "mongoose";

const PurchaseOrderSchema = new mongoose.Schema(
    {
        vendor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
            required: true,
        },
        project_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
        items: [
            {
                inventory_id: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
                description: { type: String },
                quantity: { type: Number, required: true },
                unit_price: { type: Number, required: true },
            },
        ],
        total_amount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["draft", "pending", "approved", "shipped", "received", "cancelled"],
            default: "draft",
        },
        expected_delivery: { type: Date },
        received_at: { type: Date },
    },
    { timestamps: true }
);

export default mongoose.models.PurchaseOrder ||
    mongoose.model("PurchaseOrder", PurchaseOrderSchema);
