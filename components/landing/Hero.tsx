import { GlowButton } from "@/components/ui/GlowButton";
import { Badge } from "@/components/ui/Badge";
import { SignInPanel } from "@/components/landing/SignInPanel";
import { BrandBoothPreview } from "@/components/landing/BrandBoothPreview";
import { FloatingFalCards } from "@/components/landing/FloatingFalCards";
import { heroCopy } from "@/lib/landing-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-10 md:px-6 md:pt-16">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Badge variant="purple">{heroCopy.badge}</Badge>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              {heroCopy.headline}{" "}
              <span className="text-gradient-neon">{heroCopy.headlineAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              {heroCopy.subcopy}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <GlowButton href="/create">{heroCopy.primaryCta}</GlowButton>
              <GlowButton href="/result" variant="secondary">
                {heroCopy.secondaryCta}
              </GlowButton>
            </div>
            <div className="mt-10">
              <SignInPanel />
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[480px]">
            <FloatingFalCards />
            <BrandBoothPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
