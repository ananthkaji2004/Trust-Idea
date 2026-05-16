"use client";

import { useCallback, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { FounderAvatars } from "./ui/FounderAvatars";
import { LandingButton } from "./ui/LandingButton";
import { HeroOAuthButtons } from "./HeroOAuthButtons";
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

export function Hero() {
  const { openLoginModal } = useAuth();
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
              <LandingButton
                variant="primary"
                onClick={() => openLoginModal("/dashboard")}
              >
                Generate Brand Reality
              </LandingButton>
              <LandingButton variant="outline" href="#3d-brand-reality">
                View Demo
              </LandingButton>
            </div>

            <HeroOAuthButtons />

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
