"use client";

import { useEffect, useState } from "react";

export default function DocumentsPage() {
    const [docs, setDocs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/documents")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setDocs(json.data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 space-y-6 text-[rgb(var(--text))]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Document Management</h1>
                <button className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity">
                    Upload Document
                </button>
            </div>

            <div className="bg-[rgb(var(--color-dark-navy))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#1f212e] text-[rgb(var(--muted))] text-sm">
                        <tr>
                            <th className="px-6 py-4 font-semibold">File Name</th>
                            <th className="px-6 py-4 font-semibold">Type</th>
                            <th className="px-6 py-4 font-semibold">Version</th>
                            <th className="px-6 py-4 font-semibold">Uploaded By</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--border))]">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : docs.length > 0 ? docs.map((doc) => (
                            <tr key={doc._id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium flex items-center gap-2">
                                    <span className="text-gray-400">📄</span>
                                    {doc.file_url.split('/').pop()}
                                </td>
                                <td className="px-6 py-4 uppercase text-xs text-[rgb(var(--muted))]">{doc.type}</td>
                                <td className="px-6 py-4 text-sm font-mono">v{doc.version}</td>
                                <td className="px-6 py-4 text-sm">{doc.uploaded_by?.name || "System"}</td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <button className="text-blue-400 hover:underline text-sm font-medium">Download</button>
                                    <button className="text-[rgb(var(--muted))] hover:text-white text-sm">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={5} className="px-6 py-4 text-center italic text-[rgb(var(--muted))]">No documents found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
