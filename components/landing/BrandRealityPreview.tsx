import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionHeader } from "./ui/SectionHeader";

export function BrandRealityPreview() {
  return (
    <section id="3d-brand-reality" className="relative py-20 md:py-28 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <SectionHeader
            badge="3D Preview"
            title="See Your Brand in 3D Before You Launch"
            subtitle="Immersive brand booths and product stages — no Blender skills required."
          />
        </ScrollReveal>

        <ScrollReveal variant="scale-up" duration={900}>
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-black overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12),transparent_70%)] pointer-events-none" />

            <div className="relative grid lg:grid-cols-2 gap-8 p-8 md:p-12 items-center">
              <ScrollReveal variant="slide-right" delay={150} className="perspective-hero h-64 sm:h-80 preserve-3d flex items-center justify-center">
                <div
                  className="relative w-full max-w-sm preserve-3d animate-float"
                  style={{ transform: "rotateX(12deg) rotateY(15deg)" }}
                >
                  <div className="absolute inset-0 rounded-2xl border border-violet-500/30 animate-glow-pulse" />
                  <div
                    className="relative rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-white/10 p-8 shadow-[0_0_60px_rgba(168,85,247,0.25)]"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">
                      3D Brand Stage
                    </p>
                    <p className="text-2xl font-bold neon-text">Your Product Here</p>
                    <div className="mt-6 flex gap-3">
                      <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-violet-500/50 to-blue-500/50 border border-white/20" />
                      <div className="h-16 flex-1 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs text-zinc-500">
                        Lifestyle backdrop
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-violet-500/20 blur-xl rounded-full"
                    style={{ transform: "rotateX(80deg) translateZ(-10px)" }}
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal variant="slide-left" delay={250}>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    3D Brand Reality Preview
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    Place your product in a futuristic neon booth, rotate the scene, and share
                    investor-ready previews — all generated from your brand kit with CSS-powered
                    3D staging.
                  </p>
                  <ul className="space-y-3 text-sm text-zinc-300">
                    {[
                      "Interactive booth lighting and neon frames",
                      "Product pedestal with brand-aligned gradients",
                      "Export-ready preview frames for pitch decks",
                      "Syncs with Fal Visual Lab assets automatically",
                    ].map((item, i) => (
                      <li key={item}>
                        <ScrollReveal variant="fade-up" delay={300 + i * 80}>
                          <div className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
                            {item}
                          </div>
                        </ScrollReveal>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
