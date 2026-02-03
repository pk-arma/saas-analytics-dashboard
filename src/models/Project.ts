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
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.PLANNED,
    },
    start_date: { type: Date },
    end_date: { type: Date },
    budget: { type: Number, min: 0 },
    assigned_team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
