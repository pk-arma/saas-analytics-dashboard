"use client";

import { useEffect, useState } from "react";

export default function HRPage() {
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/employees")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setEmployees(json.data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 space-y-6 text-[rgb(var(--text))]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Human Resources</h1>
                <button className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity">
                    Onboard Employee
                </button>
            </div>

            <div className="bg-[rgb(var(--color-dark-navy))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#1f212e] text-[rgb(var(--muted))] text-sm">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Name</th>
                            <th className="px-6 py-4 font-semibold">Role</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Certifications</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--border))]">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : employees.length > 0 ? employees.map((emp) => (
                            <tr key={emp._id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{emp.name}</td>
                                <td className="px-6 py-4 text-sm font-bold text-[rgb(var(--primary))]">{emp.role}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${emp.employment_status === 'active' ? 'bg-green-900/40 text-green-400' :
                                            'bg-gray-700 text-gray-300'
                                        }`}>
                                        {emp.employment_status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    {emp.certifications?.length > 0 ? (
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-green-500 text-xs">✓</span>
                                            {emp.certifications.length} active
                                        </div>
                                    ) : <span className="text-red-400 text-xs">No active certs</span>}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[rgb(var(--primary))] hover:underline text-sm font-medium">View Personnel File</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={5} className="px-6 py-4 text-center italic text-[rgb(var(--muted))]">No employees found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
