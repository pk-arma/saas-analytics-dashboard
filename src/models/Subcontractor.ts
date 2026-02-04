import mongoose from "mongoose";

const SubcontractorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact_info: {
      email: { type: String },
      phone: { type: String },
      address: { type: String },
    },
    services: [{ type: String }], // List of services provided
    assigned_projects: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    ],
    performance_history: [
      {
        project_id: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
        rating: { type: Number, min: 0, max: 5 },
        comments: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    payment_history: [
      {
        amount: { type: Number },
        date: { type: Date },
        status: { type: String, enum: ["pending", "paid"] },
        reference: { type: String },
      },
    ],
    payment_terms: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Subcontractor ||
  mongoose.model("Subcontractor", SubcontractorSchema);
