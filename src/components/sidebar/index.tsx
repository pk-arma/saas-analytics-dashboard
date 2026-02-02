import Link from "next/link";


const SideBar = ()=>{
    return(
        <>
         <aside className="w-64 bg-[rgb(var(--bg))] border-r border-[rgb(var(--border))] p-4">
         <h2 className="text-xl font-bold text-[rgb(var(--primary))]">SaaS</h2>
        <nav className="mt-6 space-y-3 ">
          <Link href="/dashboard" className="block hover:text-[rgb(var(--text))]">Dashboard</Link>
          <Link href="/dashboard/sales" className="block hover:text-[rgb(var(--text))]">Sales</Link>
          <Link href="/dashboard/users" className="block hover:text-[rgb(var(--text))]">Users</Link>
        </nav>
      </aside>
        </>
    )
}

export default SideBar;