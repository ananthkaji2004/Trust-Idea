"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/lib/dashboard-routes";

export function DashboardMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="-mx-4 mb-6 overflow-x-auto md:-mx-6 lg:hidden">
      <div className="flex min-w-max gap-2 px-4 pb-1 md:px-6">
        {sidebarLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`min-h-9 shrink-0 rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                active
                  ? "border border-violet-500/40 bg-violet-600/25 text-zinc-950 dark:text-white"
                  : "border border-zinc-200/80 text-zinc-600 hover:text-zinc-950 dark:border-white/10 dark:text-zinc-400 dark:hover:text-white"
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
