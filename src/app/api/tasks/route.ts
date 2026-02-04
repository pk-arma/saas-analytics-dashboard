import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get("project_id");

        const query = projectId ? { project_id: projectId } : {};
        const tasks = await Task.find(query).populate("assigned_to", "name");

        return NextResponse.json({ success: true, data: tasks });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const task = await Task.create(body);
        return NextResponse.json({ success: true, data: task }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
