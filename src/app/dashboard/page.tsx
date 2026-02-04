"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/analytics")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setData(json.data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-6 text-[rgb(var(--text))]">Loading dashboard...</div>;

    return (
        <div className="p-6 space-y-6 text-[rgb(var(--text))]">
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Projects" value={data?.counts?.projects || 0} color="rgb(var(--primary))" />
                <StatCard title="Active Clients" value={data?.counts?.clients || 0} color="rgb(var(--secondary))" />
                <StatCard title="Submitted Bids" value={data?.counts?.bids || 0} color="rgb(var(--color-yellow))" />
                <StatCard title="Total Revenue" value={`$${data?.revenue || 0}`} color="rgb(var(--color-green))" />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bid Status Chart (Simplified representation) */}
                <div className="lg:col-span-2 bg-[rgb(var(--color-dark-navy))] p-6 rounded-xl border border-[rgb(var(--border))]">
                    <h3 className="text-lg font-semibold mb-4">Bid Status Distribution</h3>
                    <div className="space-y-4">
                        {data?.bid_stats?.length > 0 ? data.bid_stats.map((stat: any) => {
                            const percentage = data.counts.bids > 0 ? (stat.count / data.counts.bids) * 100 : 0;
                            return (
                                <div key={stat._id} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="capitalize">{stat._id || 'Unknown'}</span>
                                        <span>{stat.count} ({percentage.toFixed(1)}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                        <div
                                            className="h-2 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: stat._id === 'approved' ? 'rgb(var(--secondary))' : stat._id === 'rejected' ? 'rgb(var(--color-red))' : 'rgb(var(--primary))'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        }) : <div className="text-[rgb(var(--muted))] italic">No bid data available</div>}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-[rgb(var(--color-dark-navy))] p-6 rounded-xl border border-[rgb(var(--border))]">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <ActionButton label="New Client" href="/dashboard/clients" />
                        <ActionButton label="Create Bid" href="/dashboard/bids" />
                        <ActionButton label="Add Project" href="/dashboard/projects" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, color }: { title: string, value: any, color: string }) {
    return (
        <div className="bg-[rgb(var(--color-dark-navy))] p-6 rounded-xl border border-[rgb(var(--border))] shadow-sm transition-all hover:scale-[1.02]">
            <div className="text-[rgb(var(--muted))] text-sm font-medium">{title}</div>
            <div className="text-3xl font-bold mt-2" style={{ color }}>{value}</div>
        </div>
    );
}

function ActionButton({ label, href }: { label: string, href: string }) {
    return (
        <a
            href={href}
            className="flex items-center justify-center px-4 py-2 bg-[rgb(var(--bg))] hover:bg-[rgb(var(--border))] rounded-lg text-sm font-medium transition-colors border border-[rgb(var(--border))]"
        >
            {label}
        </a>
    );
}