type DashboardSectionHeaderProps = {
  title: string;
  description: string;
};

export function DashboardSectionHeader({ title, description }: DashboardSectionHeaderProps) {
  return (
    <div className="mb-6">
      <p className="trust-kicker mb-3">Dashboard</p>
      <h1 className="trust-heading">{title}</h1>
      <p className="trust-copy mt-3 max-w-2xl">{description}</p>
    </div>
  );
}
