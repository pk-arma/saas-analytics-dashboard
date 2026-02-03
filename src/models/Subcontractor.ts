import mongoose from "mongoose";

const SubcontractorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact_info: { type: String, required: true },
    assigned_projects: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    ],
    rating: { type: Number, min: 0, max: 5 },
    payment_terms: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Subcontractor ||
  mongoose.model("Subcontractor", SubcontractorSchema);
