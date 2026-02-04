'use client';
import Link from "next/link";
import { useState } from "react";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg> },
    { href: "/dashboard/clients", label: "Clients", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
    { href: "/dashboard/projects", label: "Projects", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" /><path d="M12 18v4" /><path d="M8 21h8" /><path d="M12 4v8l4-4-4-4" /></svg> },
    { href: "/dashboard/project-controls", label: "Controls", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg> },
    { href: "/dashboard/bids", label: "Bids", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8" /><path d="m16 6-4 4-4-4" /><rect width="20" height="8" x="2" y="14" rx="2" /></svg> },
    { href: "/dashboard/subcontractors", label: "Subs", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
    { href: "/dashboard/invoices", label: "Invoices", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 2-2h14V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /><line x1="18" x2="18" y1="12" y2="12" /><line x1="11" x2="11" y1="16" y2="16" /><line x1="8" x2="8" y1="11" y2="11" /></svg> },
    { href: "/dashboard/documents", label: "Docs", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg> }
  ];

  const resourceLinks = [
    { href: "/dashboard/inventory", label: "Inventory", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg> },
    { href: "/dashboard/assets", label: "Assets", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg> },
    { href: "/dashboard/hr", label: "Personnel", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg> }
  ];

  return (
    <aside className={`${isCollapsed ? "w-20" : "w-64"} bg-[rgb(var(--bg))] border-r border-[rgb(var(--border))] p-4 transition-all duration-300 flex flex-col relative`}>
      <div className="flex items-center justify-between mb-8 overflow-hidden">
        {!isCollapsed && <h2 className="text-xl font-bold text-[rgb(var(--primary))] truncate">SaaS ERP</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-[rgb(var(--border))] rounded-lg transition-colors text-[rgb(var(--muted))] hover:text-white"
        >
          {isCollapsed ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[rgb(var(--border))] hover:text-[rgb(var(--primary))] transition-all group overflow-hidden whitespace-nowrap"
            title={isCollapsed ? link.label : ""}
          >
            <span className="flex-shrink-0">{link.icon}</span>
            {!isCollapsed && <span className="text-sm font-medium">{link.label}</span>}
          </Link>
        ))}

        <div className={`mt-6 pt-4 border-t border-[rgb(var(--border))] ${isCollapsed ? 'hidden' : 'block'}`}>
          <div className="text-[10px] font-bold text-[rgb(var(--muted))] uppercase tracking-widest mb-2 px-2">Resources</div>
          {resourceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-[rgb(var(--border))] hover:text-[rgb(var(--primary))] transition-all group overflow-hidden whitespace-nowrap"
              title={isCollapsed ? link.label : ""}
            >
              <span className="flex-shrink-0">{link.icon}</span>
              {!isCollapsed && <span className="text-sm font-medium">{link.label}</span>}
            </Link>
          ))}
        </div>

        {/* Show small icons for resources when collapsed */}
        {isCollapsed && (
          <div className="mt-4 pt-4 border-t border-[rgb(var(--border))] space-y-2">
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-center p-2 rounded-lg hover:bg-[rgb(var(--border))] hover:text-[rgb(var(--primary))] transition-all group"
                title={link.label}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className={`mt-auto pt-4 border-t border-[rgb(var(--border))] ${isCollapsed ? "flex justify-center" : "flex items-center gap-3"}`}>
        <div className="w-8 h-8 rounded-full bg-[rgb(var(--primary))] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">JD</div>
        {!isCollapsed && <div className="text-xs font-medium truncate">John Doe</div>}
      </div>
    </aside>
  );
};

export default SideBar;