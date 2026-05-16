import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";
import { FalVisualLabGallery } from "@/components/dashboard/FalVisualLabGallery";

export default function FalVisualLabPage() {
  return (
    <>
      <DashboardSectionHeader
        title="Fal Visual Lab"
        description="Review and edit AI-generated visuals for your brand."
      />
      <FalVisualLabGallery />
    </>
  );
}
