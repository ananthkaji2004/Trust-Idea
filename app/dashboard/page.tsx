import { BrandRealityCard } from "@/components/dashboard/BrandRealityCard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FalVisualLabGallery } from "@/components/dashboard/FalVisualLabGallery";
import { NextStepsCard } from "@/components/dashboard/NextStepsCard";
import { ProjectSummaryBar } from "@/components/dashboard/ProjectSummaryBar";
import { TrustScoreCard } from "@/components/dashboard/TrustScoreCard";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <ProjectSummaryBar />
      <div className="mt-6">
        <FalVisualLabGallery />
      </div>
      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
        <BrandRealityCard />
        <TrustScoreCard />
        <NextStepsCard />
      </div>
    </>
  );
}
