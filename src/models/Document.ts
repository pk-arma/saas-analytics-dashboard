import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    type: { type: String, required: true },
    file_url: { type: String, required: true },
    version: { type: Number, default: 1, min: 1 },
    uploaded_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

export default mongoose.models.Document ||
  mongoose.model("Document", DocumentSchema);
