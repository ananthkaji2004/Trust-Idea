import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";
import { CreateNewForm } from "./CreateNewForm";

export default function CreateNewPage() {
  return (
    <>
      <DashboardSectionHeader
        title="Create New"
        description="Start a new brand project from your idea."
      />
      <CreateNewForm />
    </>
  );
}
