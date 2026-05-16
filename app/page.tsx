import { Hero } from "@/components/landing/Hero";
import { CssBrandVisual } from "@/components/landing/CssBrandVisual";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { CtaBand } from "@/components/landing/CtaBand";

export default function HomePage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Hero />
          <CssBrandVisual />
        </div>
      </div>
      <FeatureGrid />
      <CtaBand />
      <footer className="border-t border-white/5 px-4 py-8 text-center text-sm text-zinc-500 md:px-6">
        Veridia AI — Best Use of Fal hackathon MVP. Demo data only.
      </footer>
    </>
  );
}
