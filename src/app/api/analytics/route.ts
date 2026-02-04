import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import Bid from "@/models/Bid";
import Invoice from "@/models/Invoice";
import Client from "@/models/Client";

export async function GET() {
    try {
        await dbConnect();

        const [projectCount, bidCount, invoiceCount, clientCount] = await Promise.all([
            Project.countDocuments(),
            Bid.countDocuments(),
            Invoice.countDocuments(),
            Client.countDocuments(),
        ]);

        const revenue = await Invoice.aggregate([
            { $match: { status: "paid" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const bidStats = await Bid.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        return NextResponse.json({
            success: true,
            data: {
                counts: {
                    projects: projectCount,
                    bids: bidCount,
                    invoices: invoiceCount,
                    clients: clientCount,
                },
                revenue: revenue[0]?.total || 0,
                bid_stats: bidStats,
            }
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
