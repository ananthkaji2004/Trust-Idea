type SectionHeaderProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${alignClass}`}>
      {badge && (
        <span className="inline-block mb-4 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-xs font-medium uppercase tracking-wider text-violet-300">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-zinc-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
