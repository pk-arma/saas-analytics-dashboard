"use client";

import { useEffect, useState } from "react";
import { BidStatus } from "@/enums";

export default function BidsPage() {
    const [bids, setBids] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/bids")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setBids(json.data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 space-y-6 text-[rgb(var(--text))]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Bids & Proposals</h1>
                <div className="space-x-3">
                    <button className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-[rgb(var(--border))] hover:bg-gray-700 transition-colors">
                        Templates
                    </button>
                    <button className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity">
                        New Bid
                    </button>
                </div>
            </div>

            <div className="bg-[rgb(var(--color-dark-navy))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#1f212e] text-[rgb(var(--muted))] text-sm">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Bid ID</th>
                            <th className="px-6 py-4 font-semibold">Project</th>
                            <th className="px-6 py-4 font-semibold">Total Cost</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--border))]">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-4 text-center">Loading bids...</td></tr>
                        ) : bids.length > 0 ? bids.map((bid) => (
                            <tr key={bid._id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs text-[rgb(var(--muted))]">#{bid._id.slice(-6)}</td>
                                <td className="px-6 py-4 font-medium">{bid.project_id?.name || "-"}</td>
                                <td className="px-6 py-4 font-semibold">${bid.total_cost?.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${bid.status === BidStatus.APPROVED ? 'bg-green-900/40 text-green-400' :
                                            bid.status === BidStatus.SUBMITTED ? 'bg-blue-900/40 text-blue-400' :
                                                bid.status === BidStatus.REJECTED ? 'bg-red-900/40 text-red-400' :
                                                    'bg-gray-700 text-gray-300'
                                        }`}>
                                        {bid.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[rgb(var(--primary))] hover:underline text-sm">View Bid</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={5} className="px-6 py-4 text-center italic text-[rgb(var(--muted))]">No bids found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
