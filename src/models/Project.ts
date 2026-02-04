import mongoose from "mongoose";
import { ProjectStatus } from "@/enums";

const ProjectSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.PLANNED,
    },
    start_date: { type: Date },
    end_date: { type: Date },
    budget: { type: Number, min: 0 },
    assigned_team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    subcontractors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subcontractor" }],
    milestones: [
      {
        name: { type: String, required: true },
        due_date: { type: Date },
        completed: { type: Boolean, default: false },
      },
    ],
    labor_hours: { type: Number, default: 0 },
    material_usage: [
      {
        item: { type: String },
        quantity: { type: Number },
        cost: { type: Number },
      },
    ],
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
