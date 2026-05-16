import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { BrandResult } from "@/lib/types";

export function BrandIdentity({ brand }: { brand: BrandResult }) {
  return (
    <section>
      <SectionHeader
        eyebrow="Brand Identity"
        title={brand.name}
        description={brand.tagline}
      />
      <GlassCard glow="emerald">
        <p className="text-sm text-zinc-300 leading-relaxed">{brand.mission}</p>

        <div className="mt-8">
          <h4 className="text-sm font-medium text-zinc-400">Color palette</h4>
          <div className="mt-3 flex flex-wrap gap-3">
            {brand.colors.map((color) => (
              <div key={color.hex} className="flex items-center gap-2">
                <span
                  className="h-10 w-10 rounded-lg border border-white/10 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <p className="text-xs font-medium text-white">{color.name}</p>
                  <p className="text-xs text-zinc-500">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium text-zinc-400">Typography</h4>
            <p className="mt-2 text-white">
              Headings:{" "}
              <span className="font-serif text-lg">{brand.typography.heading}</span>
            </p>
            <p className="mt-1 text-white">
              Body: <span className="text-lg">{brand.typography.body}</span>
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-400">Voice & tone</h4>
            <ul className="mt-2 space-y-2">
              {brand.voiceTone.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-zinc-300">
                  <span className="text-emerald-400">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
