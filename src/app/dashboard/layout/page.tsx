export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[rgb(var(--bg))]">
      <aside className="w-64 bg-[rgb(var(--card))] border-r border-[rgb(var(--border))] p-4">
        <h2 className="text-xl font-bold text-[rgb(var(--primary))]">SaaS</h2>
        <nav className="mt-6 space-y-3 text-[rgb(var(--muted))]">
          <a href="/dashboard" className="block hover:text-[rgb(var(--text))]">Dashboard</a>
          <a href="/dashboard/sales" className="block hover:text-[rgb(var(--text))]">Sales</a>
          <a href="/dashboard/users" className="block hover:text-[rgb(var(--text))]">Users</a>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  )
}
