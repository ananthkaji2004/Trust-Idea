"use client";

import { useState } from "react";
import { urbanBrewCeylon } from "@/lib/sample-data";
import { BrandIdentity } from "@/components/result/BrandIdentity";
import { FalVisualLab } from "@/components/result/FalVisualLab";
import { BrandScene3D } from "@/components/result/BrandScene3D";
import { TrustScore } from "@/components/result/TrustScore";
import { MultilingualKit } from "@/components/result/MultilingualKit";
import { UserGuideModal } from "@/components/result/UserGuideModal";
import { GlowButton } from "@/components/ui/GlowButton";
import { Badge } from "@/components/ui/Badge";

export default function ResultPage() {
  const [guideOpen, setGuideOpen] = useState(false);
  const brand = urbanBrewCeylon;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge variant="emerald">Demo result</Badge>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Your brand kit is ready
          </h1>
          <p className="mt-2 text-zinc-400">
            Launch-ready assets for <span className="text-emerald-400">{brand.name}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <GlowButton variant="secondary" onClick={() => setGuideOpen(true)}>
            Open User Guide
          </GlowButton>
          <GlowButton href="/create" variant="ghost">
            Create another
          </GlowButton>
        </div>
      </div>

      <div className="space-y-16">
        <BrandIdentity brand={brand} />
        <FalVisualLab brand={brand} />
        <BrandScene3D />
        <TrustScore brand={brand} />
        <MultilingualKit brand={brand} />
      </div>

      <div className="sticky bottom-4 mt-12 flex justify-center gap-3 rounded-2xl border border-white/10 bg-[#07070d]/90 p-4 backdrop-blur-xl md:hidden">
        <GlowButton variant="secondary" onClick={() => setGuideOpen(true)}>
          User Guide
        </GlowButton>
        <GlowButton href="/create" variant="primary">
          Create another
        </GlowButton>
      </div>

      <UserGuideModal
        open={guideOpen}
        onClose={() => setGuideOpen(false)}
        steps={brand.userGuide}
      />
    </div>
  );
}
