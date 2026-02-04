import mongoose from "mongoose";

const DailyLogSchema = new mongoose.Schema(
    {
        project_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        date: { type: Date, default: Date.now },
        weather: { type: String },
        work_performed: { type: String, required: true },
        incidents: { type: String },
        photos: [{ type: String }], // URLs to photos
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export default mongoose.models.DailyLog ||
    mongoose.model("DailyLog", DailyLogSchema);
