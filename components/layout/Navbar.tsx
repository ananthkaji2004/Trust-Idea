"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navAnchors } from "@/lib/landing-data";
import { GlowButton } from "@/components/ui/GlowButton";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const loginHref = isHome ? "#sign-in" : "/#sign-in";

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#06060f]/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-violet-500/25">
            TI
          </span>
          <span className="text-lg font-semibold text-white transition-colors group-hover:text-violet-300">
            Trust Idea
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {isHome
            ? navAnchors.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))
            : (
              <>
                <Link
                  href="/create"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Create
                </Link>
                <Link
                  href="/result"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Result
                </Link>
              </>
            )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <GlowButton href={loginHref} variant="ghost" className="!px-4 !py-2">
            Log in
          </GlowButton>
          <GlowButton href="/create" className="!px-4 !py-2">
            Get started
          </GlowButton>
        </div>
      </nav>
    </header>
  );
}
