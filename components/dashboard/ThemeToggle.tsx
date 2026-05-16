"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { saveUserPreferences } from "@/src/lib/database";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [isDark, setIsDark] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    const dark = stored ? stored === "dark" : root.classList.contains("dark");
    setIsDark(dark);
    root.classList.toggle("dark", dark);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    if (user?.id) {
      void saveUserPreferences(user.id, { theme: next ? "dark" : "light" });
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`rounded-xl border border-zinc-300/80 dark:border-white/10 dark:bg-white/5 bg-zinc-900/5 text-zinc-800 dark:text-zinc-300 hover:bg-white hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white transition-colors ${
        compact
          ? "inline-flex h-9 w-9 items-center justify-center p-0"
          : "flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium"
      }`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
      {!compact ? (isDark ? "Light mode" : "Dark mode") : null}
    </button>
  );
}
