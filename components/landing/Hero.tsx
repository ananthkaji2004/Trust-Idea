import { GlowButton } from "@/components/ui/GlowButton";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <section className="relative px-4 pb-16 pt-12 md:px-6 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <Badge variant="purple">Best Use of Fal — Hackathon MVP</Badge>
        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          One idea.{" "}
          <span className="text-gradient">Launch-ready brand reality.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400 leading-relaxed">
          Veridia AI turns a raw business concept into a trusted, multilingual
          brand kit — Fal visuals, 3D preview, AI Trust Score, and a complete
          user guide. Built for founders who move fast.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <GlowButton href="/create" variant="primary">
            Start building
          </GlowButton>
          <GlowButton href="/result" variant="secondary">
            See sample result
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
