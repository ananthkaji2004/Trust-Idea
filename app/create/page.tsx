import { BrandForm } from "@/components/create/BrandForm";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function CreatePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeader
        eyebrow="Create"
        title="Describe your business idea"
        description="Veridia will transform your inputs into a launch-ready brand kit. Demo mode uses Urban Brew Ceylon sample data."
      />
      <BrandForm />
    </div>
  );
}
