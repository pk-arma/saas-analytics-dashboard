"use client";

import { useEffect, useState } from "react";
import { ClientStatus } from "@/enums";

export default function ClientsPage() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newClient, setNewClient] = useState({ name: "", address: "", status: ClientStatus.LEAD });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = () => {
        setLoading(true);
        fetch("/api/clients")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setClients(json.data);
                setLoading(false);
            });
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/clients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newClient),
        });
        const json = await res.json();
        if (json.success) {
            setNewClient({ name: "", address: "", status: ClientStatus.LEAD });
            setShowForm(false);
            fetchClients();
        }
    };

    return (
        <div className="p-6 space-y-6 text-[rgb(var(--text))]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Client Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                    {showForm ? "Cancel" : "Add Client"}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleCreate} className="bg-[rgb(var(--color-dark-navy))] p-6 rounded-xl border border-[rgb(var(--border))] space-y-4 max-w-md">
                    <h3 className="text-lg font-semibold">New Client</h3>
                    <div>
                        <label className="block text-sm font-medium mb-1">Company Name</label>
                        <input
                            required
                            className="w-full px-4 py-2 rounded-lg bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:ring-2 focus:ring-[rgb(var(--primary))]"
                            value={newClient.name}
                            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <input
                            className="w-full px-4 py-2 rounded-lg bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:ring-2 focus:ring-[rgb(var(--primary))]"
                            value={newClient.address}
                            onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Initial Status</label>
                        <select
                            className="w-full px-4 py-2 rounded-lg bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:ring-2 focus:ring-[rgb(var(--primary))]"
                            value={newClient.status}
                            onChange={(e) => setNewClient({ ...newClient, status: e.target.value as any })}
                        >
                            {Object.values(ClientStatus).map(status => (
                                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity">
                        Save Client
                    </button>
                </form>
            )}

            <div className="bg-[rgb(var(--color-dark-navy))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#1f212e] text-[rgb(var(--muted))] text-sm">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Name</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Address</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--border))]">
                        {loading ? (
                            <tr><td colSpan={4} className="px-6 py-4 text-center">Loading clients...</td></tr>
                        ) : clients.length > 0 ? clients.map((client) => (
                            <tr key={client._id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{client.name}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${client.status === ClientStatus.PROJECT ? 'bg-green-900/40 text-green-400' :
                                            client.status === ClientStatus.LEAD ? 'bg-blue-900/40 text-blue-400' :
                                                'bg-gray-700 text-gray-300'
                                        }`}>
                                        {client.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-[rgb(var(--muted))]">{client.address || "-"}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[rgb(var(--primary))] hover:underline text-sm">View Details</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={4} className="px-6 py-4 text-center italic text-[rgb(var(--muted))]">No clients found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
