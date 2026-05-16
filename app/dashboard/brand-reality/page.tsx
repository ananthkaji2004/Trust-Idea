import { BrandRealityCard } from "@/components/dashboard/BrandRealityCard";
import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";

export default function BrandRealityPage() {
  return (
    <>
      <DashboardSectionHeader
        title="3D Brand Reality"
        description="Explore your immersive 3D brand booth preview."
      />
      <div className="max-w-xl">
        <BrandRealityCard />
      </div>
    </>
  );
}
