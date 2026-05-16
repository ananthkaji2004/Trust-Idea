type DashboardSectionHeaderProps = {
  title: string;
  description: string;
};

export function DashboardSectionHeader({ title, description }: DashboardSectionHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
      <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">{description}</p>
    </div>
  );
}
