import { GlowButton } from "@/components/ui/GlowButton";
import { Badge } from "@/components/ui/Badge";

export function CtaBand() {
  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10 p-10 text-center md:p-14">
        <Badge variant="emerald">Best Use of Fal</Badge>
        <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
          Ready to turn your idea into reality?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-zinc-400">
          Join the hackathon demo — generate a full brand kit for Urban Brew Ceylon
          in seconds. No API keys required.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <GlowButton href="/create">Create your brand</GlowButton>
          <GlowButton href="/result" variant="secondary">
            View sample
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
