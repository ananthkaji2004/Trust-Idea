export function SkeletonPulse({ className }: { className?: string }) {
  const extra = className ?? "";
  return (
    <div
      className={`rounded-2xl bg-white/10 animate-pulse motion-reduce:animate-none ${extra}`}
    />
  );
}
