import { urbanBrewCeylon } from "@/lib/sample-data";
import { Badge } from "@/components/ui/Badge";

const positions = [
  "top-0 -left-4 md:-left-8",
  "top-12 -right-2 md:right-0",
  "bottom-16 left-0 md:left-4",
  "bottom-4 -right-4 md:-right-6",
] as const;

const delays = ["0s", "1.5s", "0.8s", "2.2s"] as const;

export function FloatingFalCards() {
  const visuals = urbanBrewCeylon.visuals.slice(0, 4);

  return (
    <div className="pointer-events-none absolute inset-0">
      {visuals.map((visual, i) => (
        <div
          key={visual.id}
          className={`absolute w-28 md:w-32 ${positions[i]} animate-float glass-panel rounded-xl overflow-hidden border border-white/10 shadow-lg`}
          style={{ animationDelay: delays[i] }}
        >
          <div
            className={`flex h-16 items-center justify-center bg-gradient-to-br ${visual.gradient}`}
          >
            <span className="text-lg text-white/50">✦</span>
          </div>
          <div className="p-2">
            <div className="flex items-center justify-between gap-1">
              <span className="truncate text-[10px] font-medium text-white">
                {visual.label}
              </span>
              <Badge variant="purple">Fal</Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
