const founders = [
  { initials: "AK", color: "from-violet-500 to-purple-600" },
  { initials: "JL", color: "from-blue-500 to-indigo-600" },
  { initials: "MR", color: "from-fuchsia-500 to-violet-600" },
  { initials: "SC", color: "from-cyan-500 to-blue-600" },
  { initials: "DP", color: "from-indigo-500 to-purple-600" },
];

export function FounderAvatars() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-3">
        {founders.map((f, i) => (
          <div
            key={f.initials}
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-gradient-to-br ${f.color} text-xs font-semibold text-white shadow-lg`}
            style={{ zIndex: founders.length - i }}
            title={`Founder ${f.initials}`}
          >
            {f.initials}
          </div>
        ))}
      </div>
      <p className="text-sm text-zinc-400">
        <span className="font-medium text-zinc-300">2,400+ founders</span> building
        trusted brands
      </p>
    </div>
  );
}
