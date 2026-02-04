import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const client = await Client.findById(params.id);
        if (!client) {
            return NextResponse.json({ success: false, error: "Client not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: client });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const body = await request.json();
        const client = await Client.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        if (!client) {
            return NextResponse.json({ success: false, error: "Client not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: client });
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
        const deletedClient = await Client.deleteOne({ _id: params.id });
        if (!deletedClient.deletedCount) {
            return NextResponse.json({ success: false, error: "Client not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
