export type ProductType = "F&B" | "SaaS" | "Retail" | "Services";
export type BrandStyle = "Modern" | "Premium" | "Playful" | "Minimal";
export type LanguageOption =
  | "English"
  | "Sinhala"
  | "Tamil"
  | "Multilingual";

export interface BrandFormValues {
  businessIdea: string;
  productType: ProductType;
  audience: string;
  brandStyle: BrandStyle;
  language: LanguageOption;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface VisualPlaceholder {
  id: string;
  label: string;
  gradient: string;
  caption: string;
}

export interface TrustMetric {
  label: string;
  score: number;
}

export interface LocaleContent {
  code: "en" | "si" | "ta";
  language: string;
  headline: string;
  description: string;
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
  colors: ColorSwatch[];
  typography: { heading: string; body: string };
  voiceTone: string[];
  visuals: VisualPlaceholder[];
  trustScore: {
    overall: number;
    metrics: TrustMetric[];
    recommendation: string;
  };
  locales: LocaleContent[];
  userGuide: UserGuideStep[];
}
