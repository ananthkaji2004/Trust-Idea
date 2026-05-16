import { GlowButton } from "@/components/ui/GlowButton";
import { Badge } from "@/components/ui/Badge";
import { ctaCopy } from "@/lib/landing-data";

export function CtaBand() {
  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel neon-border rounded-3xl p-10 text-center md:p-14 glow-neon">
          <Badge variant="purple">{ctaCopy.badge}</Badge>
          <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
            {ctaCopy.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-zinc-400">{ctaCopy.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <GlowButton href="/#sign-in" variant="secondary">
              Sign in
            </GlowButton>
            <GlowButton href="/create">{ctaCopy.primaryCta}</GlowButton>
            <GlowButton href="/result" variant="ghost">
              {ctaCopy.secondaryCta}
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
