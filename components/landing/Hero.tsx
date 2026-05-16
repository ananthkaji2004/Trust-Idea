"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Badge } from "@/components/ui/Badge";
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
    animation: "animate-drift-soft",
    delay: "0s",
  },
  {
    id: "lifestyle",
    label: "Lifestyle Scene",
    gradient: "bg-gradient-to-br from-blue-600/80 to-cyan-500/60",
    position: "top-1/4 -right-2 sm:-right-6 lg:-right-10",
    animation: "animate-drift-soft",
    delay: "1s",
  },
  {
    id: "social-ad",
    label: "Social Media Ad",
    gradient: "bg-gradient-to-br from-indigo-600/80 to-violet-500/60",
    position: "bottom-1/3 -left-4 sm:-left-10",
    animation: "animate-drift-soft",
    delay: "0.8s",
  },
  {
    id: "product-mockup",
    label: "Product Mockup",
    gradient: "bg-gradient-to-br from-purple-600/80 to-blue-500/60",
    position: "bottom-8 -right-4 sm:-right-12",
    animation: "animate-drift-soft",
    delay: "1.4s",
  },
  {
    id: "trust-score",
    label: "AI Trust Score",
    gradient: "bg-gradient-to-br from-emerald-600/40 to-violet-600/60",
    position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-4 sm:translate-y-0",
    animation: "animate-drift-soft",
    delay: "2s",
    score: "78/100",
  },
];

const MOBILE_VISIBLE_CARDS = ["hero-image", "lifestyle", "trust-score"];

export function Hero() {
  const router = useRouter();
  const { openLoginModal, user, demoSession } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [idea, setIdea] = useState("");

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

  const getCardParallax = useCallback(
    (index: number): CSSProperties => ({
      transform: `translate(${parallax.x * (8 + index * 2)}px, ${parallax.y * (6 + index * 2)}px)`,
      transition: "transform 0.15s ease-out",
    }),
    [parallax]
  );

  const launchCreate = () => {
    const trimmed = idea.trim();
    const query = trimmed ? `?idea=${encodeURIComponent(trimmed)}` : "";
    if (user ?? demoSession) {
      router.push(`/create${query}`);
      return;
    }
    router.prefetch(`/create${query}`);
    openLoginModal(`/create${query}`);
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pb-24">
      <div className="trust-container">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.92fr)] lg:gap-14">
          <div className="relative z-10">
            <div className="hero-enter hero-delay-1 mb-8 flex flex-wrap items-center gap-3">
              <Badge variant="purple">Best Use of Fal Track</Badge>
              <span className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">Realtime Visual Lab</span>
            </div>

            <h1 className="hero-enter hero-delay-2 max-w-3xl text-4xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Turn One Idea Into a{" "}
              <span className="neon-text">Trusted Brand Reality.</span>
            </h1>

            <p className="hero-enter hero-delay-3 mt-6 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
              TRUST IDEA translates raw sparks into Fal-powered visuals, glassy multilingual copy, cinematic 3D booths,
              and an AI Trust Score so every founder can sprint from imagination to credible launch-ready assets.
            </p>

            <div className="hero-enter hero-delay-4 mt-10">
              <div className="flex max-w-2xl flex-col gap-3 rounded-[2rem] border border-zinc-200/80 bg-white/85 p-2 shadow-[0_24px_90px_rgba(99,102,241,0.16)] backdrop-blur-2xl dark:border-white/15 dark:bg-gradient-to-b dark:from-[#090909]/90 dark:to-black/95 dark:shadow-[0_0_60px_rgba(168,85,247,0.18)]">
                <textarea
                  value={idea}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setIdea(e.target.value)}
                  rows={4}
                  placeholder="Describe your business idea..."
                  className="min-h-[128px] w-full resize-none rounded-[1.4rem] border border-transparent bg-transparent px-4 py-4 text-base text-zinc-950 placeholder:text-zinc-500 focus-visible:border-violet-500/35 focus-visible:outline-none dark:text-white"
                />
                <button
                  type="button"
                  onClick={launchCreate}
                  className="trust-button-primary w-full rounded-[1.35rem] py-3.5"
                >
                  Generate Brand Reality
                </button>
              </div>
              <p className="mt-3 max-w-xl text-xs leading-5 text-zinc-500">
                We’ll funnel this straight into `/create`. Not signed in yet? Secure login pops up instantly.
              </p>
            </div>

            <div className="hero-enter hero-delay-6 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LandingButton variant="outline" href="#fal-visual-lab">
                Explore Fal previews
              </LandingButton>
              <LandingButton variant="ghost" href="#guide">
                View journey
              </LandingButton>
            </div>

            <div className="hero-enter mt-12" style={{ animationDelay: "0.95s" }}>
              <FounderAvatars />
            </div>

            <div className="hero-enter mt-10 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
              <span>Built with</span>
              <Link
                href="https://www.cursor.com"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1 text-zinc-300 hover:border-violet-500/35 hover:text-white transition-colors"
              >
                Cursor
              </Link>
              <span>· Hackathon hardened</span>
            </div>
          </div>

          <div
            ref={heroRef}
            className="hero-enter-right hero-delay-5 perspective-hero preserve-3d relative min-h-[360px] scale-[0.93] sm:min-h-[480px] lg:scale-100"
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
                  MOBILE_VISIBLE_CARDS.includes(card.id) ? ""
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
