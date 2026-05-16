export type ProductServiceType =
  | "Food & Beverage"
  | "SaaS / Software"
  | "Retail / E-commerce"
  | "Services"
  | "Health & Wellness"
  | "Other";

export type BrandStyle =
  | "Premium"
  | "Futuristic"
  | "Friendly"
  | "Local"
  | "Luxury"
  | "Minimal";

export type LanguageOption = "English" | "Tamil Tanglish" | "Sinhala";

export type VisualMood = "Cinematic" | "Bold" | "Clean" | "Warm" | "Playful";

export type OutputDepth = "Quick" | "Balanced" | "Detailed";

export interface BrandFormValues {
  businessIdea: string;
  productServiceType: ProductServiceType;
  targetAudience: string;
  location: string;
  customerProblem: string;
  brandStyle: BrandStyle;
  visualMood: VisualMood;
  language: LanguageOption;
  outputDepth: OutputDepth;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface FalVisualAsset {
  id: string;
  label: string;
  imageUrl: string | null;
  prompt: string;
  gradient: string;
  caption: string;
}

export interface VisualPlaceholder {
  id: string;
  label: string;
  gradient: string;
  caption: string;
  imageUrl?: string | null;
  prompt?: string;
}

export interface TrustMetric {
  label: string;
  score: number;
}

export interface TrustSuggestion {
  title: string;
  description: string;
}

export interface LocaleContent {
  code: "en" | "si" | "ta" | "tg";
  language: string;
  headline: string;
  websiteHeadline: string;
  socialCaption: string;
  whatsappMessage: string;
  shortAdCopy: string;
  description: string;
  founderPitch: string;
  cta: string;
  hashtags: string[];
}

export interface UserGuideStep {
  title: string;
  description: string;
}

export interface BrandResult {
  name: string;
  tagline: string;
  mission: string;
  productTag?: string;
  colors: ColorSwatch[];
  typography: { heading: string; body: string };
  voiceTone: string[];
  visuals: VisualPlaceholder[];
  trustScore: {
    overall: number;
    metrics: TrustMetric[];
    suggestions: TrustSuggestion[];
    recommendation: string;
  };
  locales: LocaleContent[];
  userGuide: UserGuideStep[];
}

export interface StoredProject {
  id: string;
  form: BrandFormValues;
  brand: BrandResult;
  visuals: FalVisualAsset[];
  createdAt: string;
}

/** Server-side blueprint shape consumed by `/api/generate-brand` clients */
export interface BrandBlueprintPayload {
  brandName: string;
  tagline: string;
  mission: string;
  targetAudience: string;
  painPoints: string;
  uniqueSellingPoint: string;
  brandTone: string;
  colorPalette: ColorSwatch[];
  websiteSections: string[];
  launchCaptions: string[];
  trustScore: number;
  trustSuggestions: { title: string; description: string }[];
}

export interface GeneratedVisualPayload {
  title: string;
  type: string;
  prompt: string;
  imageUrl: string | null;
  status: "ready" | "fallback" | "error";
}

export interface TrustIdeaPersistedDoc {
  id: string;
  user_id?: string | null;
  title: string;
  input_data: BrandFormValues;
  brand_data: BrandResult & { blueprint?: BrandBlueprintPayload };
  visual_assets: FalVisualAsset[];
  trust_score: number;
  created_at: string;
}

export interface GenerateVisualsRequest {
  businessIdea: string;
  brandName: string;
  targetAudience: string;
  style: string;
  language: string;
}

export interface GenerateVisualsResponse {
  visuals: FalVisualAsset[];
  source: "fal" | "fallback";
}
