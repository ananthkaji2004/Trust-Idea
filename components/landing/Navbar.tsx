"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { LANDING_HEADER_OFFSET, scrollToLandingSection } from "@/lib/landing-scroll";
import { LandingButton } from "./ui/LandingButton";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

const HEADER_OFFSET = LANDING_HEADER_OFFSET;

/** Landing scroll targets — matched to section ids */
const navLinks = [
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How It Works" },
  { id: "fal-visual-lab", label: "Fal Visual Lab" },
  { id: "3d-brand-reality", label: "3D Brand Reality" },
  { id: "ai-trust-score", label: "AI Trust Score" },
  { id: "documents", label: "Documents" },
  { id: "guide", label: "Guide" },
] as const;

type SectionId = (typeof navLinks)[number]["id"];

function getScrollTop(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY;
}

export function Navbar() {
  const router = useRouter();
  const { openLoginModal, user, demoSession } = useAuth();
  const nextAfterAuth = "/create";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<SectionId | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const navListRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<SectionId, HTMLAnchorElement>>(new Map());
  const isClickScrolling = useRef(false);

  const updateIndicator = useCallback(() => {
    const container = navListRef.current;
    if (!activeId) {
      setIndicator({ left: 0, width: 0 });
      return;
    }
    const link = linkRefs.current.get(activeId);
    if (!container || !link) return;

    const containerRect = container.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setIndicator({
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
    });
  }, [activeId]);

  const resolveActiveSection = useCallback((): SectionId | null => {
    if (window.scrollY < 120) return null;

    const scrollMarker = window.scrollY + HEADER_OFFSET + 64;
    let current: SectionId | null = null;

    for (const { id } of navLinks) {
      const el = document.getElementById(id);
      if (el && getScrollTop(el) <= scrollMarker) {
        current = id;
      }
    }

    return current;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (isClickScrolling.current) return;
      setActiveId(resolveActiveSection());
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [resolveActiveSection]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator, { passive: true });
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const scrollToSection = (id: SectionId) => {
    isClickScrolling.current = true;
    setActiveId(id);
    scrollToLandingSection(id);
    window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  const handleNavClick = (id: SectionId, e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection(id);
    setMobileOpen(false);
  };

  const startFree = () => {
    if (user ?? demoSession) {
      router.push(nextAfterAuth);
      return;
    }
    router.prefetch(nextAfterAuth);
    openLoginModal(nextAfterAuth);
  };

  const login = () => {
    openLoginModal("/dashboard");
  };

  const headerTone = scrolled ? "backdrop-blur-xl" : "";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${headerTone} dark:border-white/10 dark:bg-black/90 border-zinc-200/70 bg-white/85 dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)]`}
    >
      <nav className="trust-container flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveId(null);
          }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-xs font-black text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-transform">
            TI
          </div>
          <span className="text-lg font-bold tracking-tight dark:text-white text-zinc-900">
            TRUST <span className="neon-text">IDEA</span>
          </span>
        </a>

        <div ref={navListRef} className="relative hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto px-2 lg:flex">
          <span
            className="pointer-events-none absolute -bottom-0.5 h-px rounded-full bg-gradient-to-r from-violet-500/80 via-indigo-400/80 to-blue-500/80 shadow-[0_0_10px_rgba(168,85,247,0.55)] transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.width > 0 ? 1 : 0,
            }}
            aria-hidden
          />
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                ref={(node) => {
                  if (node) linkRefs.current.set(link.id, node);
                  else linkRefs.current.delete(link.id);
                }}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`relative whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive ? "dark:text-white text-zinc-900" : "text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-200 hover:text-zinc-800"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <div className="hidden md:block shrink-0">
            <ThemeToggle compact />
          </div>
          <LandingButton variant="ghost" className="min-h-9 px-3 py-2" onClick={login}>
            Login
          </LandingButton>
          <LandingButton variant="primary" className="min-h-9 px-3 py-2" onClick={startFree}>
            Get Started Free
          </LandingButton>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-zinc-500 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t dark:border-white/10 border-zinc-200/80 bg-white dark:bg-black/92 backdrop-blur-xl px-4 py-4 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            <div className="pb-3">
              <ThemeToggle compact />
            </div>
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(link.id, e)}
                  className={`text-sm py-2.5 pl-3 border-l-2 transition-colors ${
                    isActive ? "border-violet-500 text-zinc-900 dark:text-white" : "border-transparent text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="flex flex-col gap-2 pt-4 mt-2 border-t dark:border-white/10 border-zinc-200/80">
              <LandingButton variant="ghost" onClick={login}>
                Login
              </LandingButton>
              <LandingButton variant="primary" onClick={startFree}>
                Get Started Free
              </LandingButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
