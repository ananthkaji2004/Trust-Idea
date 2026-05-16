"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/lib/dashboard-routes";

export function DashboardMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden -mx-4 md:-mx-6 mb-6 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 px-4 md:px-6 min-w-max pb-1">
        {sidebarLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "bg-violet-600/25 text-white border border-violet-500/40"
                  : "text-zinc-400 border border-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
