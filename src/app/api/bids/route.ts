import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Bid from "@/models/Bid";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get("project_id");
        const isTemplate = searchParams.get("is_template");

        let query: any = {};
        if (projectId) query.project_id = projectId;
        if (isTemplate) query.is_template = isTemplate === "true";

        const bids = await Bid.find(query).populate("project_id", "name");
        return NextResponse.json({ success: true, data: bids });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const bid = await Bid.create(body);
        return NextResponse.json({ success: true, data: bid }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
