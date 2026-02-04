"use client";

import { useEffect, useState } from "react";

export default function InventoryPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/inventory")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setItems(json.data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 space-y-6 text-[rgb(var(--text))]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Inventory & Stock</h1>
                <button className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity">
                    Add Material
                </button>
            </div>

            <div className="bg-[rgb(var(--color-dark-navy))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#1f212e] text-[rgb(var(--muted))] text-sm">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Material Name</th>
                            <th className="px-6 py-4 font-semibold">Category</th>
                            <th className="px-6 py-4 font-semibold">Stock Level</th>
                            <th className="px-6 py-4 font-semibold">Reorder Point</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--border))]">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : items.length > 0 ? items.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{item.name}</td>
                                <td className="px-6 py-4 text-sm text-[rgb(var(--muted))]">{item.category || "-"}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold ${item.available_quantity <= item.reorder_point ? 'text-red-400' : 'text-green-400'}`}>
                                            {item.available_quantity} {item.unit}
                                        </span>
                                        {item.available_quantity <= item.reorder_point && (
                                            <span className="text-[10px] bg-red-900/40 text-red-400 px-1.5 py-0.5 rounded uppercase font-extrabold">Low Stock</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm">{item.reorder_point} {item.unit}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[rgb(var(--primary))] hover:underline text-sm font-medium">Order More</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={5} className="px-6 py-4 text-center italic text-[rgb(var(--muted))]">No inventory items found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
