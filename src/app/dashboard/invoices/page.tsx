"use client";

import { useEffect, useState } from "react";
import { InvoiceStatus } from "@/enums";

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/invoices")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setInvoices(json.data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 space-y-6 text-[rgb(var(--text))]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Invoices & Payments</h1>
                <button className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity">
                    Generate Invoice
                </button>
            </div>

            <div className="bg-[rgb(var(--color-dark-navy))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#1f212e] text-[rgb(var(--muted))] text-sm">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Invoice #</th>
                            <th className="px-6 py-4 font-semibold">Project</th>
                            <th className="px-6 py-4 font-semibold">Amount</th>
                            <th className="px-6 py-4 font-semibold">Due Date</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--border))]">
                        {loading ? (
                            <tr><td colSpan={6} className="px-6 py-4 text-center">Loading invoices...</td></tr>
                        ) : invoices.length > 0 ? invoices.map((invoice) => (
                            <tr key={invoice._id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs">INV-{invoice._id.slice(-6).toUpperCase()}</td>
                                <td className="px-6 py-4 font-medium">{invoice.project_id?.name || "-"}</td>
                                <td className="px-6 py-4 font-semibold text-green-400">${invoice.amount?.toLocaleString()}</td>
                                <td className="px-6 py-4 text-[rgb(var(--muted))] text-sm">{invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "-"}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${invoice.status === InvoiceStatus.PAID ? 'bg-green-900/40 text-green-400' :
                                            invoice.status === InvoiceStatus.OVERDUE ? 'bg-red-900/40 text-red-400' :
                                                'bg-yellow-900/40 text-yellow-400'
                                        }`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[rgb(var(--primary))] hover:underline text-sm">Record Payment</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={6} className="px-6 py-4 text-center italic text-[rgb(var(--muted))]">No invoices found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
