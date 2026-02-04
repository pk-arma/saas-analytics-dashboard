"use client";

import { useEffect, useState } from "react";

export default function AssetsPage() {
    const [assets, setAssets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/assets")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setAssets(json.data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 space-y-6 text-[rgb(var(--text))]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Asset & Equipment Tracking</h1>
                <button className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity">
                    Register Asset
                </button>
            </div>

            <div className="bg-[rgb(var(--color-dark-navy))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#1f212e] text-[rgb(var(--muted))] text-sm">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Asset Name</th>
                            <th className="px-6 py-4 font-semibold">Type</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Current Project</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--border))]">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : assets.length > 0 ? assets.map((asset) => (
                            <tr key={asset._id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium">{asset.name}</div>
                                    <div className="text-[10px] text-[rgb(var(--muted))] font-mono">{asset.serial_number || "N/A"}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[rgb(var(--muted))] uppercase">{asset.type}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${asset.status === 'available' ? 'bg-green-900/40 text-green-400' :
                                            asset.status === 'in_use' ? 'bg-blue-900/40 text-blue-400' :
                                                'bg-yellow-900/40 text-yellow-400'
                                        }`}>
                                        {asset.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">{asset.current_project_id?.name || "Unassigned"}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[rgb(var(--primary))] hover:underline text-sm font-medium">Log Maintenance</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={5} className="px-6 py-4 text-center italic text-[rgb(var(--muted))]">No assets found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
