import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Communication from "@/models/Communication";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const clientId = searchParams.get("client_id");

        const query = clientId ? { client_id: clientId } : {};
        const communications = await Communication.find(query).sort({ date: -1 });

        return NextResponse.json({ success: true, data: communications });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const communication = await Communication.create(body);
        return NextResponse.json({ success: true, data: communication }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
