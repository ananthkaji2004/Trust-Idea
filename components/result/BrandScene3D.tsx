import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function BrandScene3D() {
  const boxSize = 80;
  const half = boxSize / 2;

  return (
    <section>
      <SectionHeader
        eyebrow="3D Brand Reality"
        title="Packaging & product preview"
        description="CSS 3D scene — Urban Brew Ceylon cup and retail box."
        align="center"
      />
      <GlassCard className="flex flex-col items-center py-12" glow="emerald">
        <div className="perspective-scene h-72 w-full max-w-md">
          <div className="brand-scene relative mx-auto h-56 w-56">
            {/* Box */}
            <div
              className="absolute left-1/2 top-4"
              style={{
                width: boxSize,
                height: boxSize,
                marginLeft: -half - 50,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="scene-face bg-emerald-900/80 text-emerald-200"
                style={{
                  width: boxSize,
                  height: boxSize,
                  transform: `translateZ(${half}px)`,
                }}
              >
                UB
              </div>
              <div
                className="scene-face bg-stone-800/80"
                style={{
                  width: boxSize,
                  height: boxSize,
                  transform: `rotateY(90deg) translateZ(${half}px)`,
                }}
              />
              <div
                className="scene-face bg-amber-900/60 text-amber-200"
                style={{
                  width: boxSize,
                  height: boxSize,
                  transform: `rotateY(180deg) translateZ(${half}px)`,
                }}
              >
                Ceylon
              </div>
              <div
                className="scene-face bg-emerald-950/80"
                style={{
                  width: boxSize,
                  height: boxSize,
                  transform: `rotateY(-90deg) translateZ(${half}px)`,
                }}
              />
              <div
                className="scene-face bg-stone-900/80"
                style={{
                  width: boxSize,
                  height: boxSize,
                  transform: `rotateX(90deg) translateZ(${half}px)`,
                }}
              />
              <div
                className="scene-face bg-stone-950/80"
                style={{
                  width: boxSize,
                  height: boxSize,
                  transform: `rotateX(-90deg) translateZ(${half}px)`,
                }}
              />
            </div>

            {/* Cup */}
            <div
              className="absolute left-1/2 bottom-0"
              style={{
                width: 48,
                height: 64,
                marginLeft: 30,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="scene-face rounded-t-lg bg-gradient-to-b from-amber-700/90 to-stone-900/90 text-[10px] text-amber-100"
                style={{
                  width: 48,
                  height: 64,
                  transform: "translateZ(24px)",
                }}
              >
                ☕
              </div>
              <div
                className="scene-face bg-stone-800/90"
                style={{
                  width: 48,
                  height: 64,
                  transform: "rotateY(90deg) translateZ(24px)",
                }}
              />
              <div
                className="scene-face bg-amber-900/70"
                style={{
                  width: 48,
                  height: 64,
                  transform: "rotateY(180deg) translateZ(24px)",
                }}
              />
              <div
                className="scene-face bg-stone-800/90"
                style={{
                  width: 48,
                  height: 64,
                  transform: "rotateY(-90deg) translateZ(24px)",
                }}
              />
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-zinc-500">
          Hover to pause rotation · Full 3D export coming soon
        </p>
      </GlassCard>
    </section>
  );
}
