import type { BrandFormValues } from "@/lib/types";

export type FalVisualSlot = "logo" | "hero" | "mockup" | "social_ad";

export function buildVisualPrompts(form: BrandFormValues, brandName: string): Record<FalVisualSlot, string> {
  const style = `${form.brandStyle} aesthetic, ${form.visualMood} mood, premium neon lighting touches`;
  const audience = form.targetAudience;
  const ctx = `${brandName}. ${form.businessIdea.slice(0, 380)}`;

  return {
    logo: `Ultra-clean vector-ready brand mark and wordmark fusion for "${brandName}", ${style}, memorable geometry, sapphire and violet gradients, minimalist icon + logotype pairing, centered on charcoal background, ultra sharp, branding agency quality. Context: ${ctx}`,
    hero: `Cinematic widescreen hero image for "${brandName}", lifestyle scene showcasing the product/service for audience: ${audience}, ${style}, dramatic lighting, futuristic glass booths, violet and blue volumetric rim light, 8k photographic detail. Context: ${ctx}`,
    mockup: `Photorealistic product/service mockup for "${brandName}", glossy packaging or device scene, studio lighting, tactile materials, pedestal display, violet ambient glow reflections, ecommerce hero shot quality. Audience: ${audience}. Context: ${ctx}`,
    social_ad: `High-converting Instagram square ad creative for "${brandName}", punchy headline area, neon gradient overlays, founder-friendly CTA slab, trendy Gen-Z startup advertising look, vivid but premium. Audience: ${audience}. Context: ${ctx}`,
  };
}
