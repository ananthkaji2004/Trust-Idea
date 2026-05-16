"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type ScrollRevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "scale-up"
  | "blur-in";

type ScrollRevealProps = {
  children: ReactNode;
  variant?: ScrollRevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
};

const hiddenByVariant: Record<ScrollRevealVariant, string> = {
  "fade-up": "opacity-0 translate-y-10",
  "fade-down": "opacity-0 -translate-y-10",
  "fade-in": "opacity-0",
  "slide-left": "opacity-0 translate-x-12",
  "slide-right": "opacity-0 -translate-x-12",
  "scale-up": "opacity-0 scale-[0.92]",
  "blur-in": "opacity-0 blur-sm scale-[0.98]",
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  once = true,
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      className={`will-change-transform motion-safe:transition-all motion-reduce:transition-none ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible
          ? "opacity-100 translate-x-0 translate-y-0 scale-100 blur-0"
          : hiddenByVariant[variant]
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
