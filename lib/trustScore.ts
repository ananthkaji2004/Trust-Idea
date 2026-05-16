/** Default breakdown labels for hackathon/demo UI */
export const TRUST_DIMENSIONS = [
  "Brand clarity",
  "Audience clarity",
  "Visual consistency",
  "CTA strength",
  "Transparency",
  "Conversion readiness",
  "Founder story",
  "Social proof readiness",
] as const;

export type TrustDimension = (typeof TRUST_DIMENSIONS)[number];

export const DEFAULT_TRUST_SUGGESTIONS = [
  {
    title: "Add founder story",
    description: "Humanize your brand with a short bio and why you built this.",
  },
  {
    title: "Add customer proof",
    description: "Add testimonials, pilots, logos, or waitlist numbers if available.",
  },
  {
    title: "Improve CTA",
    description: "Use one primary action per touchpoint — make the next step obvious.",
  },
  { title: "Add FAQ", description: "Pre-answer shipping, refunds, timelines, and support." },
  {
    title: "Add refund policy",
    description: "Clear guarantees increase confidence and perceived safety.",
  },
] as const;

export function heuristicTrustScore(depth: string): number {
  if (depth === "Quick") return 72;
  if (depth === "Detailed") return 84;
  return 78;
}

export function buildTrustMetrics(score: number) {
  const base = score - 14;
  return TRUST_DIMENSIONS.map((label, i) => ({
    label,
    score: Math.min(100, Math.max(48, Math.round(base + ((i * 17) % 13)))),
  }));
}
