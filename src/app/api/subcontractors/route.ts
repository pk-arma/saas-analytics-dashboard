import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subcontractor from "@/models/Subcontractor";

export async function GET() {
    try {
        await dbConnect();
        const subcontractors = await Subcontractor.find({});
        return NextResponse.json({ success: true, data: subcontractors });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const subcontractor = await Subcontractor.create(body);
        return NextResponse.json({ success: true, data: subcontractor }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
