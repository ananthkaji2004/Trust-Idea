"use client";

import { useMemo, useState } from "react";
import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";

const CAMERA_ANGLES = [
  { id: "front", label: "Front", rotateX: 58, rotateY: 0 },
  { id: "quarter", label: "Quarter", rotateX: 58, rotateY: 14 },
  { id: "dramatic", label: "Dramatic", rotateX: 63, rotateY: 24 },
] as const;

const LIGHTS = [
  { id: "violet", label: "Neon Violet", glow: "rgba(168,85,247,0.35)" },
  { id: "blue", label: "Azure Rim", glow: "rgba(59,130,246,0.35)" },
  { id: "mint", label: "Mint Pulse", glow: "rgba(16,185,129,0.3)" },
] as const;

const ENVIRONMENTS = [
  { id: "expo", label: "Expo Booth" },
  { id: "studio", label: "Dark Studio" },
  { id: "launch", label: "Launch Stage" },
] as const;

type CameraId = (typeof CAMERA_ANGLES)[number]["id"];
type LightId = (typeof LIGHTS)[number]["id"];
type EnvironmentId = (typeof ENVIRONMENTS)[number]["id"];

export default function BrandRealityPage() {
  const [camera, setCamera] = useState<CameraId>("quarter");
  const [light, setLight] = useState<LightId>("violet");
  const [environment, setEnvironment] = useState<EnvironmentId>("expo");

  const selectedCam = useMemo(
    () => CAMERA_ANGLES.find((c) => c.id === camera) ?? CAMERA_ANGLES[1],
    [camera]
  );
  const selectedLight = useMemo(
    () => LIGHTS.find((l) => l.id === light) ?? LIGHTS[0],
    [light]
  );

  return (
    <>
      <DashboardSectionHeader
        title="3D Brand Reality"
        description="Explore your immersive 3D brand booth preview."
      />
      <div className="grid max-w-6xl gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.85fr)]">
        <article className="glass-card p-5 sm:p-6">
          <p className="trust-kicker mb-2">Interactive Booth</p>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Camera + light playground</h2>

          <div className="mt-4 rounded-3xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="relative min-h-[290px] overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/80 via-indigo-950 to-black">
              <div
                className="absolute inset-0 transition-all duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 80%, ${selectedLight.glow}, transparent 60%)`,
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
              <div className="absolute inset-0 flex items-center justify-center [perspective:1200px]">
                <div
                  className="relative h-28 w-[78%] rounded-2xl border border-violet-400/35 bg-violet-900/30 shadow-[0_0_60px_rgba(168,85,247,0.35)] transition-transform duration-500"
                  style={{
                    transform: `rotateX(${selectedCam.rotateX}deg) rotateY(${selectedCam.rotateY}deg) translateZ(18px)`,
                  }}
                />
                <div className="absolute top-9 left-1/2 h-16 w-16 -translate-x-1/2 rounded-lg border border-violet-300/35 bg-gradient-to-br from-violet-400/30 to-blue-500/25 blur-[0.4px]" />
              </div>
              <div className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-200">
                {environment}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <ControlGroup<CameraId>
              title="Camera"
              options={CAMERA_ANGLES.map((c) => ({ id: c.id, label: c.label }))}
              value={camera}
              onChange={setCamera}
            />
            <ControlGroup<LightId>
              title="Lighting"
              options={LIGHTS.map((l) => ({ id: l.id, label: l.label }))}
              value={light}
              onChange={setLight}
            />
            <ControlGroup<EnvironmentId>
              title="Environment"
              options={ENVIRONMENTS.map((e) => ({ id: e.id, label: e.label }))}
              value={environment}
              onChange={setEnvironment}
            />
          </div>
        </article>

        <article className="glass-card p-6">
          <p className="trust-kicker mb-3">Scene Controls</p>
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Export-ready motion UI</h2>
          <p className="trust-copy mt-3">
            Keep the same TRUST IDEA style while demonstrating a richer 3D booth. Tabs and controls are lightweight
            CSS interactions so the page remains fast for hackathon demos.
          </p>
          <div className="mt-6 grid gap-3">
            {["Brand-lit pedestal", "Investor preview frame", "Export-safe aspect ratio"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 text-sm text-zinc-700 transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <button type="button" className="trust-button-primary text-xs">
              Export Frame
            </button>
            <button type="button" className="trust-button-secondary text-xs">
              Copy Camera Preset
            </button>
          </div>
        </article>
      </div>
    </>
  );
}

function ControlGroup<T extends string>({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: Array<{ id: T; label: string }>;
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <section>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{title}</p>
      <div className="grid gap-2">
        {options.map((opt) => {
          const active = opt.id === value;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`rounded-xl border px-3 py-2 text-left text-xs font-medium transition-all duration-200 ${
                active
                  ? "border-violet-500/40 bg-violet-600/20 text-violet-100 shadow-[0_10px_30px_rgba(99,102,241,0.24)]"
                  : "border-zinc-300/80 bg-white/70 text-zinc-700 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.08]"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
