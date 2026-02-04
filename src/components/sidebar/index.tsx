import Link from "next/link";


const SideBar = () => {
  return (
    <>
      <aside className="w-64 bg-[rgb(var(--bg))] border-r border-[rgb(var(--border))] p-4">
        <h2 className="text-xl font-bold text-[rgb(var(--primary))]">SaaS</h2>
        <nav className="mt-6 space-y-3">
          <Link href="/dashboard" className="block hover:text-[rgb(var(--primary))] transition-colors">Dashboard</Link>
          <Link href="/dashboard/clients" className="block hover:text-[rgb(var(--primary))] transition-colors">Clients</Link>
          <Link href="/dashboard/projects" className="block hover:text-[rgb(var(--primary))] transition-colors">Projects</Link>
          <Link href="/dashboard/bids" className="block hover:text-[rgb(var(--primary))] transition-colors">Bids & Proposals</Link>
          <Link href="/dashboard/subcontractors" className="block hover:text-[rgb(var(--primary))] transition-colors">Subcontractors</Link>
          <Link href="/dashboard/invoices" className="block hover:text-[rgb(var(--primary))] transition-colors">Invoices</Link>
          <Link href="/dashboard/documents" className="block hover:text-[rgb(var(--primary))] transition-colors">Documents</Link>
        </nav>
      </aside>
    </>
  )
}

export default SideBar;