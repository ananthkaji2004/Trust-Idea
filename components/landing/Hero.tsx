"use client";

import { useCallback, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { FounderAvatars } from "./ui/FounderAvatars";
import { LandingButton } from "./ui/LandingButton";
import { HeroBooth } from "./HeroBooth";
import { FloatingCard, type FloatingCardData } from "./FloatingCard";

const FLOATING_CARDS: FloatingCardData[] = [
  {
    id: "hero-image",
    label: "Hero Image",
    gradient: "bg-gradient-to-br from-violet-600/80 to-fuchsia-500/60",
    position: "top-4 -left-2 sm:-left-8 lg:-left-12",
    animation: "animate-drift-slow",
    delay: "0s",
  },
  {
    id: "lifestyle",
    label: "Lifestyle Scene",
    gradient: "bg-gradient-to-br from-blue-600/80 to-cyan-500/60",
    position: "top-1/4 -right-2 sm:-right-6 lg:-right-10",
    animation: "animate-drift-slow-2",
    delay: "1s",
  },
  {
    id: "social-ad",
    label: "Social Media Ad",
    gradient: "bg-gradient-to-br from-indigo-600/80 to-violet-500/60",
    position: "bottom-1/3 -left-4 sm:-left-10",
    animation: "animate-drift-slow-2",
    delay: "0.5s",
  },
  {
    id: "product-mockup",
    label: "Product Mockup",
    gradient: "bg-gradient-to-br from-purple-600/80 to-blue-500/60",
    position: "bottom-8 -right-4 sm:-right-12",
    animation: "animate-drift-slow",
    delay: "1.5s",
  },
  {
    id: "trust-score",
    label: "AI Trust Score",
    gradient: "bg-gradient-to-br from-emerald-600/40 to-violet-600/60",
    position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-4 sm:translate-y-0",
    animation: "animate-drift-slow",
    delay: "2s",
    score: "78/100",
  },
];

const MOBILE_VISIBLE_CARDS = ["hero-image", "lifestyle", "trust-score"];

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-1.26-.675-2.52-.93-2.52-2.04 0-.465.165-.915.48-1.23 2.1-2.295 1.395-5.79.105-7.2-.99-1.17-2.685-1.23-3.15-1.23-.255 0-.75.015-1.14.435-.885.96-1.23 2.85-1.23 2.85-.36 1.14-1.05 2.22-1.89 2.865-.57.45-1.665 1.395-1.56 2.79.105 1.455.765 2.04 1.68 2.685 1.23.93 3.315 1.23 4.59.39 1.35-.885 1.89-2.295 1.89-2.295.33.63 1.26 1.17 2.1 1.395.63.18 1.305.24 1.965.18 1.23-.09 2.385-.495 2.385-.495 0 1.395.015 2.745.015 3.15 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setParallax({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  const boothStyle: CSSProperties = {
    transform: `rotateX(${-parallax.y * 4}deg) rotateY(${parallax.x * 4}deg)`,
    transition: "transform 0.15s ease-out",
  };

  const getCardParallax = (index: number): CSSProperties => ({
    transform: `translate(${parallax.x * (8 + index * 2)}px, ${parallax.y * (6 + index * 2)}px)`,
    transition: "transform 0.15s ease-out",
  });

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left copy */}
          <div className="relative z-10">
            <h1 className="hero-enter hero-delay-1 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Turn One Idea Into a{" "}
              <span className="neon-text">Trusted Brand Reality.</span>
            </h1>

            <p className="hero-enter hero-delay-2 mt-6 text-lg text-zinc-400 leading-relaxed max-w-xl">
              Turn raw business ideas into launch-ready brand kits with Fal-powered visuals,
              immersive 3D brand previews, multilingual content, and AI Trust Scores — all
              in one founder-first workspace.
            </p>

            <div className="hero-enter hero-delay-3 mt-8 flex flex-wrap gap-3">
              <LandingButton variant="primary" href="/dashboard">
                Generate Brand Reality
              </LandingButton>
              <LandingButton variant="outline" href="/dashboard">
                View Demo
              </LandingButton>
            </div>

            <div className="hero-enter hero-delay-4 mt-6 flex flex-wrap gap-2">
              <LandingButton variant="oauth" className="px-4" href="/dashboard">
                <GoogleIcon /> Google
              </LandingButton>
              <LandingButton variant="oauth" className="px-4" href="/dashboard">
                <GitHubIcon /> GitHub
              </LandingButton>
              <LandingButton variant="oauth" className="px-4" href="/dashboard">
                <EmailIcon /> Email
              </LandingButton>
            </div>

            <div className="hero-enter mt-10" style={{ animationDelay: "0.8s" }}>
              <FounderAvatars />
            </div>
          </div>

          {/* Right visual */}
          <div
            ref={heroRef}
            className="hero-enter-right hero-delay-5 relative perspective-hero min-h-[400px] sm:min-h-[480px] preserve-3d lg:scale-100 scale-90"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <HeroBooth style={boothStyle} />

            {FLOATING_CARDS.map((card, index) => (
              <FloatingCard
                key={card.id}
                card={card}
                parallaxStyle={getCardParallax(index)}
                className={
                  MOBILE_VISIBLE_CARDS.includes(card.id)
                    ? ""
                    : "hidden sm:block"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
