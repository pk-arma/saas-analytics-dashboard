import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String },
        unit: { type: String, default: "pcs" }, // e.g., meters, kg, pcs
        total_quantity: { type: Number, default: 0 },
        available_quantity: { type: Number, default: 0 },
        reserved_quantity: { type: Number, default: 0 },
        reorder_point: { type: Number, default: 10 },
        warehouse_location: { type: String },
        pricing: {
            last_purchase_price: { type: Number },
            average_price: { type: Number },
        },
    },
    { timestamps: true }
);

export default mongoose.models.Inventory ||
    mongoose.model("Inventory", InventorySchema);
