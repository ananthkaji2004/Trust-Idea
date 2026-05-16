import type { Metadata } from "next";
import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CtaBand } from "@/components/landing/CtaBand";
import { FalVisualStrip } from "@/components/landing/FalVisualStrip";
import { TrustScore } from "@/components/result/TrustScore";
import { BrandScene3D } from "@/components/result/BrandScene3D";
import { urbanBrewCeylon } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "Trust Idea — Launch-ready brand reality",
  description:
    "Turn one raw business idea into a trusted, multilingual brand kit with Fal visuals, 3D preview, and AI Trust Score. Demo data only.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="trust-score" className="scroll-mt-24 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <TrustScore brand={urbanBrewCeylon} compact />
        </div>
      </section>
      <FalVisualStrip />
      <FeatureGrid />
      <HowItWorks />
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <BrandScene3D subtitle="Spin the CSS 3D booth — packaging, cup, and retail presence before full renders." />
        </div>
      </section>
      <CtaBand />
      <footer className="border-t border-white/5 px-4 py-8 text-center text-sm text-zinc-500 md:px-6">
        Trust Idea — Premium brand intelligence demo. Sample data: Urban Brew Ceylon.
      </footer>
    </>
  );
}
