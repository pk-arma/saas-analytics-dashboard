import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Asset from "@/models/Asset";

export async function GET() {
    try {
        await dbConnect();
        const assets = await Asset.find({}).populate("current_project_id", "name");
        return NextResponse.json({ success: true, data: assets });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const asset = await Asset.create(body);
        return NextResponse.json({ success: true, data: asset }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
