interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`mb-8 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-violet-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-zinc-400 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
