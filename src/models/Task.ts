import mongoose from "mongoose";
import { TaskStatus } from "@/enums";

const TaskSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },
    due_date: { type: Date },
    attachments: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Task ||
  mongoose.model("Task", TaskSchema);
