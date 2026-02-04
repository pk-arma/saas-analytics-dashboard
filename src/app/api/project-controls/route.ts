import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ChangeOrder from "@/models/ChangeOrder";
import DailyLog from "@/models/DailyLog";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get("project_id");
        const type = searchParams.get("type"); // 'change-order' or 'daily-log'

        if (!projectId) return NextResponse.json({ success: false, error: "Missing project_id" }, { status: 400 });

        if (type === "change-order") {
            const co = await ChangeOrder.find({ project_id: projectId });
            return NextResponse.json({ success: true, data: co });
        } else if (type === "daily-log") {
            const logs = await DailyLog.find({ project_id: projectId });
            return NextResponse.json({ success: true, data: logs });
        }

        return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
