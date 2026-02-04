import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        role: { type: String, required: true },
        contact_info: {
            email: { type: String },
            phone: { type: String },
        },
        employment_status: {
            type: String,
            enum: ["active", "on_leave", "terminated"],
            default: "active",
        },
        skills: [{ type: String }],
        certifications: [
            {
                name: { type: String, required: true },
                issued_by: { type: String },
                issue_date: { type: Date },
                expiry_date: { type: Date },
                file_url: { type: String },
            },
        ],
        payroll_data: {
            hourly_rate: { type: Number },
            salary: { type: Number },
            bank_details: { type: String },
        },
    },
    { timestamps: true }
);

export default mongoose.models.Employee ||
    mongoose.model("Employee", EmployeeSchema);
