"use client";

import { useEffect, useState } from "react";
import { ProjectStatus } from "@/enums";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setProjects(json.data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 space-y-6 text-[rgb(var(--text))]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Project Management</h1>
                <button className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity">
                    New Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatusSummaryCard label="In Progress" count={projects.filter(p => p.status === ProjectStatus.IN_PROGRESS).length} color="rgb(var(--primary))" />
                <StatusSummaryCard label="Planned" count={projects.filter(p => p.status === ProjectStatus.PLANNED).length} color="rgb(var(--color-yellow))" />
                <StatusSummaryCard label="Completed" count={projects.filter(p => p.status === ProjectStatus.COMPLETED).length} color="rgb(var(--secondary))" />
            </div>

            <div className="bg-[rgb(var(--color-dark-navy))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#1f212e] text-[rgb(var(--muted))] text-sm">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Project Name</th>
                            <th className="px-6 py-4 font-semibold">Client</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Budget</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--border))]">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-4 text-center">Loading projects...</td></tr>
                        ) : projects.length > 0 ? projects.map((project) => (
                            <tr key={project._id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{project.name}</td>
                                <td className="px-6 py-4 text-[rgb(var(--muted))]">{project.client_id?.name || "-"}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${project.status === ProjectStatus.IN_PROGRESS ? 'bg-indigo-900/40 text-indigo-400' :
                                            project.status === ProjectStatus.COMPLETED ? 'bg-green-900/40 text-green-400' :
                                                'bg-gray-700 text-gray-300'
                                        }`}>
                                        {project.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4">${project.budget?.toLocaleString() || 0}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[rgb(var(--primary))] hover:underline text-sm">Manage</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={5} className="px-6 py-4 text-center italic text-[rgb(var(--muted))]">No projects found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatusSummaryCard({ label, count, color }: { label: string, count: number, color: string }) {
    return (
        <div className="bg-[rgb(var(--color-dark-navy))] p-4 rounded-xl border border-[rgb(var(--border))] flex items-center justify-between">
            <div>
                <div className="text-[rgb(var(--muted))] text-xs uppercase font-bold tracking-wider">{label}</div>
                <div className="text-2xl font-bold mt-1">{count}</div>
            </div>
            <div className="w-2 h-10 rounded-full" style={{ backgroundColor: color }}></div>
        </div>
    );
}
