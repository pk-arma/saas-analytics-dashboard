"use client";

import { useEffect, useState } from "react";

export default function SubcontractorsPage() {
    const [subs, setSubs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/subcontractors")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setSubs(json.data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 space-y-6 text-[rgb(var(--text))]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Subcontractors & Vendors</h1>
                <button className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity">
                    Add Profile
                </button>
            </div>

            <div className="bg-[rgb(var(--color-dark-navy))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#1f212e] text-[rgb(var(--muted))] text-sm">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Name</th>
                            <th className="px-6 py-4 font-semibold">Contact</th>
                            <th className="px-6 py-4 font-semibold">Services</th>
                            <th className="px-6 py-4 font-semibold">Rating</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--border))]">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : subs.length > 0 ? subs.map((sub) => (
                            <tr key={sub._id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{sub.name}</td>
                                <td className="px-6 py-4 text-sm text-[rgb(var(--muted))]">
                                    {sub.contact_info?.email || sub.contact_info?.phone || "-"}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {sub.services?.length > 0 ? sub.services.map((s: string) => (
                                            <span key={s} className="px-1.5 py-0.5 bg-gray-700 rounded text-[10px]">{s}</span>
                                        )) : "-"}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-yellow-400">★</span> {sub.performance_history?.[0]?.rating || "N/A"}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[rgb(var(--primary))] hover:underline text-sm">View History</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={5} className="px-6 py-4 text-center italic text-[rgb(var(--muted))]">No subcontractors found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
