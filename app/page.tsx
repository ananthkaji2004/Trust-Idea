import { Navbar } from "@/components/landing/Navbar";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BrandRealityPreview } from "@/components/landing/BrandRealityPreview";
import { ModernFoundersFeatures } from "@/components/landing/ModernFoundersFeatures";
import { GuideStrip } from "@/components/landing/GuideStrip";

export default function Home() {
  return (
    <main className="relative min-h-screen z-10">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <BrandRealityPreview />
      <ModernFoundersFeatures />
      <GuideStrip />
    </main>
  );
}
