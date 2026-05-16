import { Suspense } from "react";
import { AuthErrorBanner } from "@/components/auth/AuthErrorBanner";
import { Navbar } from "@/components/landing/Navbar";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FalVisualStrip } from "@/components/landing/FalVisualStrip";
import { BrandRealityPreview } from "@/components/landing/BrandRealityPreview";
import { TrustLandingPreview } from "@/components/landing/TrustLandingPreview";
import { DocumentsLandingPreview } from "@/components/landing/DocumentsLandingPreview";
import { ModernFoundersFeatures } from "@/components/landing/ModernFoundersFeatures";
import { GuideStrip } from "@/components/landing/GuideStrip";

export default function Home() {
  return (
    <main className="relative min-h-screen z-10 overflow-x-hidden">
      <Suspense fallback={null}>
        <AuthErrorBanner />
      </Suspense>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <FalVisualStrip />
      <BrandRealityPreview />
      <TrustLandingPreview />
      <DocumentsLandingPreview />
      <ModernFoundersFeatures />
      <GuideStrip />
    </main>
  );
}
