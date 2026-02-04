import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        contact_info: {
            email: { type: String },
            phone: { type: String },
            address: { type: String },
        },
        materials_supplied: [{ type: String }],
        pricing_history: [
            {
                item: { type: String },
                price: { type: Number },
                date: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.Vendor ||
    mongoose.model("Vendor", VendorSchema);
