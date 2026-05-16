import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";
import { TrustScoreCard } from "@/components/dashboard/TrustScoreCard";

export default function TrustScorePage() {
  return (
    <>
      <DashboardSectionHeader
        title="AI Trust Score"
        description="See how trustworthy and clear your brand appears to customers."
      />
      <div className="max-w-2xl">
        <TrustScoreCard />
      </div>
    </>
  );
}
