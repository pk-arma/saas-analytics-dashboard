import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Task from "@/models/Task";

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const body = await request.json();
        const task = await Task.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return NextResponse.json({ success: false, error: "Task not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: task });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const deletedTask = await Task.deleteOne({ _id: params.id });
        if (!deletedTask.deletedCount) {
            return NextResponse.json({ success: false, error: "Task not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
