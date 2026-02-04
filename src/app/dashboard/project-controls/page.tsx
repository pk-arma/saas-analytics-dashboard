"use client";

import { useEffect, useState } from "react";

export default function ProjectControlsPage() {
    const [projectId, setProjectId] = useState("");
    const [projects, setProjects] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [type, setType] = useState("change-order");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setProjects(json.data);
            });
    }, []);

    useEffect(() => {
        if (projectId) {
            setLoading(true);
            fetch(`/api/project-controls?project_id=${projectId}&type=${type}`)
                .then((res) => res.json())
                .then((json) => {
                    if (json.success) setData(json.data);
                    setLoading(false);
                });
        }
    }, [projectId, type]);

    return (
        <div className="p-6 space-y-6 text-[rgb(var(--text))]">
            <h1 className="text-2xl font-bold">Project Controls</h1>

            <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium mb-1">Select Project</label>
                    <select
                        className="w-full px-4 py-2 rounded-lg bg-[rgb(var(--bg))] border border-[rgb(var(--border))] focus:ring-2 focus:ring-[rgb(var(--primary))]"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                    >
                        <option value="">Select a project...</option>
                        {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                    </select>
                </div>
                <div className="flex bg-[rgb(var(--color-dark-navy))] rounded-lg p-1 border border-[rgb(var(--border))]">
                    <button
                        onClick={() => setType("change-order")}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${type === "change-order" ? 'bg-[rgb(var(--primary))] text-white' : 'text-[rgb(var(--muted))] hover:text-white'}`}
                    >
                        Change Orders
                    </button>
                    <button
                        onClick={() => setType("daily-log")}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${type === "daily-log" ? 'bg-[rgb(var(--primary))] text-white' : 'text-[rgb(var(--muted))] hover:text-white'}`}
                    >
                        Daily Logs
                    </button>
                </div>
            </div>

            {!projectId ? (
                <div className="bg-[rgb(var(--color-dark-navy))] p-12 rounded-xl text-center border border-dashed border-[rgb(var(--border))]">
                    <div className="text-[rgb(var(--muted))]">Please select a project to view controls</div>
                </div>
            ) : loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="bg-[rgb(var(--color-dark-navy))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
                    {type === "change-order" ? (
                        <table className="w-full text-left">
                            <thead className="bg-[#1f212e] text-[rgb(var(--muted))] text-sm">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Title</th>
                                    <th className="px-6 py-4 font-semibold">Cost Impact</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[rgb(var(--border))]">
                                {data.length > 0 ? data.map((co) => (
                                    <tr key={co._id} className="hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{co.title}</td>
                                        <td className="px-6 py-4 font-semibold text-yellow-400">
                                            {co.cost_impact >= 0 ? `+$${co.cost_impact.toLocaleString()}` : `-$${Math.abs(co.cost_impact).toLocaleString()}`}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${co.status === 'approved' ? 'bg-green-900/40 text-green-400' :
                                                    co.status === 'pending' ? 'bg-blue-900/40 text-blue-400' :
                                                        'bg-gray-700 text-gray-300'
                                                }`}>
                                                {co.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-[rgb(var(--primary))] hover:underline text-sm font-medium">Review</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={4} className="px-6 py-4 text-center italic text-[rgb(var(--muted))]">No change orders found</td></tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-6 space-y-4">
                            {data.length > 0 ? data.map((log) => (
                                <div key={log._id} className="bg-[rgb(var(--bg))] p-4 rounded-lg border border-[rgb(var(--border))]">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-bold">{new Date(log.date).toLocaleDateString()}</div>
                                        <div className="text-xs text-[rgb(var(--muted))] uppercase font-bold">{log.weather || "Clear Sky"}</div>
                                    </div>
                                    <div className="text-sm text-[rgb(var(--muted))] mb-4">{log.work_performed}</div>
                                    {log.incidents && (
                                        <div className="bg-red-900/20 p-2 rounded text-xs text-red-400 border border-red-900/40">
                                            <strong>Incident:</strong> {log.incidents}
                                        </div>
                                    )}
                                </div>
                            )) : (
                                <div className="text-center italic text-[rgb(var(--muted))] py-6">No daily logs found for this project</div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
