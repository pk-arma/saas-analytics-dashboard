import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Document from "@/models/Document";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get("project_id");

        const query = projectId ? { project_id: projectId } : {};
        const documents = await Document.find(query).populate("uploaded_by", "name");
        return NextResponse.json({ success: true, data: documents });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const document = await Document.create(body);
        return NextResponse.json({ success: true, data: document }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
