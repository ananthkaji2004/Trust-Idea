import { DEFAULT_TRUST_SUGGESTIONS, buildTrustMetrics, heuristicTrustScore } from "@/lib/trustScore";
import type {
  BrandBlueprintPayload,
  BrandFormValues,
  BrandResult,
  ColorSwatch,
  FalVisualAsset,
  GeneratedVisualPayload,
  UserGuideStep,
  VisualPlaceholder,
} from "@/lib/types";
import { buildLocaleBundle, slugifyBrand } from "@/lib/translations";
import { buildVisualPrompts, type FalVisualSlot } from "@/lib/falPrompts";

export const STORAGE_KEYS = {
  currentProject: "trust-idea-current-project",
  savedProjects: "trust-idea-saved-projects",
  kitLang: "trust-idea-multilingual-kit-lang",
} as const;

const SLOT_ORDER: FalVisualSlot[] = ["logo", "hero", "mockup", "social_ad"];

/** Static Tailwind tokens — avoids dynamic JIT misses */
export const DEMO_VISUAL_SURFACE = [
  "from-violet-700/85 via-purple-950 to-black",
  "from-blue-700/85 via-indigo-950 to-black",
  "from-fuchsia-800/85 via-purple-950 to-black",
  "from-emerald-900/85 via-teal-950 to-black",
] as const;

const SLOT_TITLE: Record<FalVisualSlot, string> = {
  logo: "Logo / Brand Mark",
  hero: "Hero Image",
  mockup: "Product Mockup",
  social_ad: "Social Media Ad",
};

function paletteFromForm(form: BrandFormValues): ColorSwatch[] {
  const combos: Record<BrandFormValues["brandStyle"], ColorSwatch[]> = {
    Premium: [
      { name: "Ink", hex: "#0B1220" },
      { name: "Royal Violet", hex: "#6D28D9" },
      { name: "Sapphire Beam", hex: "#2563EB" },
      { name: "Pearl Fog", hex: "#EEF2FF" },
    ],
    Futuristic: [
      { name: "Void Black", hex: "#020617" },
      { name: "Neon Indigo", hex: "#4F46E5" },
      { name: "Plasma Violet", hex: "#A855F7" },
      { name: "Glacier Cyan", hex: "#22D3EE" },
    ],
    Friendly: [
      { name: "Sunrise Mango", hex: "#F97316" },
      { name: "Sky Bliss", hex: "#38BDF8" },
      { name: "Cream Mist", hex: "#FDF4FF" },
      { name: "Leaf Joy", hex: "#10B981" },
    ],
    Local: [
      { name: "Terracotta", hex: "#B45309" },
      { name: "Monsoon Slate", hex: "#1E293B" },
      { name: "Jade Trust", hex: "#047857" },
      { name: "Sand Ivory", hex: "#FFFBEB" },
    ],
    Luxury: [
      { name: "Obsidian", hex: "#0F172A" },
      { name: "Rose Gold Blush", hex: "#D4AF37" },
      { name: "Bordeaux Velvet", hex: "#4C0519" },
      { name: "Champagne", hex: "#F5E6D3" },
    ],
    Minimal: [
      { name: "Graphite", hex: "#111827" },
      { name: "Concrete", hex: "#9CA3AF" },
      { name: "Paper White", hex: "#FFFFFF" },
      { name: "Signal Blue", hex: "#3B82F6" },
    ],
  };
  return combos[form.brandStyle] ?? combos.Premium;
}

function randomAdjectivePair(form: BrandFormValues) {
  const mood = `${form.visualMood} mood with ${form.brandStyle.toLowerCase()} tone`;
  return mood;
}

function defaultUserGuide(): UserGuideStep[] {
  return [
    {
      title: "Review your blueprint",
      description: "Anchor your story in one confident mission before you tweak visuals.",
    },
    {
      title: "Polish Fal assets",
      description: "Regenerate images when Fal is connected — until then placeholders stay glossy.",
    },
    {
      title: "Tune Trust Score gaps",
      description: "Add founder story + proof cues to bump scores past 82 in minutes.",
    },
    {
      title: "Open the 3D booth",
      description: "Use the immersive preview frames for landing pages + pitch reels.",
    },
    {
      title: "Prepare multilingual rollout",
      description: "Copy Roman Tanglish snippets for TikTok-ready velocity in regional markets.",
    },
    {
      title: "Export + share demo link",
      description: "Hand investors a zipped kit narrative even while backend exports warm up.",
    },
  ];
}

export function generateBrandBlueprint(form: BrandFormValues): BrandBlueprintPayload {
  const brandName = slugifyBrand(form.businessIdea);
  const tagline =
    `${randomAdjectivePair(form)} — built for ${excerpt(form.targetAudience, 64)}`;

  const pain =
    excerpt(form.customerProblem || "Founders stall because launch assets feel improvised.", 360);
  const usp =
    `${brandName} fuses curated storytelling + Fal visuals so ${form.targetAudience} trust you on day zero.`;

  const mission = excerpt(
    `We exist to elevate ${slugifyBrand(
      form.productServiceType.replace("/", " ").trim()
    )} experiences for audiences in ${excerpt(form.location, 140)} starting with "${excerpt(form.businessIdea, 520)}".`,
    640
  );

  const problemHint = excerpt(
    form.customerProblem || `${form.businessIdea} still needs sharper pain framing.`,
    120
  );
  const captions = [
    `Discover ${brandName} — rethink ${problemHint}`,
    `${form.visualMood} launch drop for founders who obsess over credibility.`,
    `Trusted by builders in ${form.location.split(",")[0] ?? "your market"}`,
  ].map((x) => excerpt(x, 160));

  const sections = ["Hero narrative", "Social proof scaffold", "Product proof", "CTA rituals", "Support & clarity"];

  const trustScore = heuristicTrustScore(form.outputDepth);

  return {
    brandName,
    tagline,
    mission,
    targetAudience: form.targetAudience,
    painPoints: pain,
    uniqueSellingPoint: excerpt(usp, 320),
    brandTone: `${form.brandStyle} · ${form.visualMood}`,
    colorPalette: paletteFromForm(form),
    websiteSections: sections,
    launchCaptions: captions,
    trustScore,
    trustSuggestions: [...DEFAULT_TRUST_SUGGESTIONS],
  };
}

function excerpt(raw: string, max: number) {
  const t = raw.trim().replace(/\s+/g, " ");
  if (!t.length) return "Momentum matters — details coming soon.";
  return t.length <= max ? t : `${t.slice(0, Math.max(0, max - 1))}…`;
}

export function blueprintToBrandResult(
  blueprint: BrandBlueprintPayload,
  form: BrandFormValues,
  visuals: FalVisualAsset[]
): BrandResult {
  const locales = buildLocaleBundle(
    {
      brandName: blueprint.brandName,
      tagline: blueprint.tagline,
      ideaLite: excerpt(form.businessIdea, 200),
      audienceLite: excerpt(form.targetAudience, 120),
    },
    form.language
  );

  const metrics = buildTrustMetrics(blueprint.trustScore);

  const visualPlaceholders: VisualPlaceholder[] = visuals.map((v, i) => {
    const preset = DEMO_VISUAL_SURFACE[i % DEMO_VISUAL_SURFACE.length];
    const grad = /\bfrom-/.test(v.gradient) ? v.gradient : preset;
    return {
      id: v.id ?? `visual-${i}`,
      label: v.label,
      gradient: grad,
      caption: excerpt(v.caption, 240),
      imageUrl: v.imageUrl ?? undefined,
      prompt: v.prompt,
    };
  });

  return {
    name: blueprint.brandName,
    tagline: blueprint.tagline,
    mission: blueprint.mission,
    productTag: `${form.outputDepth} · ${form.visualMood}`,
    colors: blueprint.colorPalette.length ? blueprint.colorPalette : paletteFromForm(form),
    typography: moodTypography(form.visualMood),
    voiceTone: [
      excerpt(blueprint.brandTone, 120),
      `Speaks plainly to ${excerpt(form.targetAudience, 140)}.`,
      excerpt(blueprint.uniqueSellingPoint, 180),
      "Keeps sourcing + AI disclosures visible when referencing generated assets.",
    ],
    visuals: visualPlaceholders,
    trustScore: {
      overall: blueprint.trustScore,
      metrics,
      suggestions: blueprint.trustSuggestions.map((t) => ({ title: t.title, description: t.description })),
      recommendation:
        blueprint.trustScore >= 82
          ? "Launch-ready scaffolding — tighten CTAs weekly as you capture real proof points."
          : "Great velocity — deepen founder storytelling + FAQs to sprint past mid-80 scores.",
    },
    locales,
    userGuide: defaultUserGuide(),
  };
}

function moodTypography(mood: BrandFormValues["visualMood"]) {
  switch (mood) {
    case "Cinematic":
      return { heading: "Space Grotesk", body: "Inter" };
    case "Warm":
      return { heading: "Fraunces", body: "Source Sans 3" };
    case "Playful":
      return { heading: "Fredoka", body: "Nunito" };
    default:
      return { heading: "Cabinet Grotesk", body: "Inter" };
  }
}

export function falPayloadsToAssets(
  form: BrandFormValues,
  brandName: string,
  payloads: GeneratedVisualPayload[]
): FalVisualAsset[] {
  const prompts = buildVisualPrompts(form, brandName);
  return payloads.map((p, index) => {
    const matchedSlot =
      SLOT_ORDER.find((s) => p.type.toLowerCase().includes(s)) ?? SLOT_ORDER[index % SLOT_ORDER.length];
    const title = SLOT_TITLE[matchedSlot] ?? p.title;
    const slug = matchedSlot;

    const gradientGlass = DEMO_VISUAL_SURFACE[index % DEMO_VISUAL_SURFACE.length];

    return {
      id: `${slug}-${index}`,
      label: title,
      prompt: p.prompt || prompts[matchedSlot] || prompts.hero,
      imageUrl: p.imageUrl,
      gradient: gradientGlass,
      caption:
        p.status === "fallback"
          ? `${title} placeholder — Fal will replace when keys are wired.`
          : `${title} · generated via Fal.`,
    };
  });
}

export function fallbackVisualAssets(form: BrandFormValues, brandName: string): FalVisualAsset[] {
  const prompts = buildVisualPrompts(form, brandName);
  let i = 0;
  const entries = SLOT_ORDER.map((slot) => {
    const gradient = DEMO_VISUAL_SURFACE[i % DEMO_VISUAL_SURFACE.length];
    i += 1;
    return {
      id: slot,
      label: SLOT_TITLE[slot],
      imageUrl: null,
      prompt: prompts[slot],
      gradient,
      caption:
        `${SLOT_TITLE[slot]} ready for Fal regeneration — cinematic ${form.visualMood.toLowerCase()} mood.`,
    } satisfies FalVisualAsset;
  });
  return entries;
}
