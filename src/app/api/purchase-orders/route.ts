import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PurchaseOrder from "@/models/PurchaseOrder";

export async function GET() {
    try {
        await dbConnect();
        const pos = await PurchaseOrder.find({}).populate("vendor_id", "name").populate("project_id", "name");
        return NextResponse.json({ success: true, data: pos });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const po = await PurchaseOrder.create(body);
        return NextResponse.json({ success: true, data: po }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
