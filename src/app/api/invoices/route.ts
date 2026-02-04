import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Invoice from "@/models/Invoice";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get("project_id");

        const query = projectId ? { project_id: projectId } : {};
        const invoices = await Invoice.find(query).populate("project_id", "name");
        return NextResponse.json({ success: true, data: invoices });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const invoice = await Invoice.create(body);
        return NextResponse.json({ success: true, data: invoice }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
