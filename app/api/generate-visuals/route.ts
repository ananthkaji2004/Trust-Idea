import { fal } from "@fal-ai/client";
import { NextResponse } from "next/server";
import { falPayloadsToAssets } from "@/lib/demoData";
import { buildVisualPrompts } from "@/lib/falPrompts";
import type { BrandFormValues, GeneratedVisualPayload } from "@/lib/types";

export const runtime = "nodejs";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function coerceForm(body: unknown): { form: BrandFormValues; brandName: string } | null {
  if (!isRecord(body)) return null;
  if (!isRecord(body.form)) return null;
  const brandName =
    typeof body.brandName === "string" && body.brandName.trim()
      ? body.brandName.trim()
      : typeof body.form.businessIdea === "string"
        ? body.form.businessIdea.split(/\s+/).slice(0, 5).join(" ")
        : null;
  if (!brandName) return null;

  /** Trust client payload after previous validation route */
  const f = body.form as unknown as BrandFormValues;
  if (
    typeof f.businessIdea !== "string"
    || typeof f.productServiceType !== "string"
    || typeof f.targetAudience !== "string"
    || typeof f.location !== "string"
    || typeof f.customerProblem !== "string"
    || typeof f.brandStyle !== "string"
    || typeof f.visualMood !== "string"
    || typeof f.language !== "string"
    || typeof f.outputDepth !== "string"
  ) {
    return null;
  }
  return { form: f, brandName };
}

async function runFalImage(prompt: string): Promise<string | null> {
  const result = await fal.subscribe("fal-ai/flux/schnell", {
    input: {
      prompt,
      image_size: "square_hd",
      num_inference_steps: 4,
    },
  });

  const data = result.data as { images?: Array<{ url?: string } | null> | null } | undefined;
  const first = data?.images?.[0];
  const rawUrl = typeof first === "object" && first?.url !== undefined ? first.url : null;
  const url =
    typeof rawUrl === "string" && /^https?:\/\//i.test(rawUrl)
      ? rawUrl
      : null;
  return url;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const parsed = coerceForm(body);
  if (!parsed) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const { form, brandName } = parsed;
  /** Trim so pasted keys with stray whitespace still work — client defaults to FAL_KEY; set explicitly for parity */
  const falKey = process.env.FAL_KEY?.trim() ?? "";
  if (falKey) {
    fal.config({ credentials: falKey });
  }

  const prompts = buildVisualPrompts(form, brandName);

  const slots: { type: string; title: string; prompt: string }[] = [
    { type: "logo", title: "Logo / Brand Mark", prompt: prompts.logo },
    { type: "hero", title: "Hero Image", prompt: prompts.hero },
    { type: "mockup", title: "Product Mockup", prompt: prompts.mockup },
    { type: "social_ad", title: "Social Media Ad", prompt: prompts.social_ad },
  ];

  const payloads: GeneratedVisualPayload[] = [];

  try {
    for (const slot of slots) {
      let imageUrl: string | null = null;
      let status: GeneratedVisualPayload["status"] = "ready";
      try {
        if (!falKey) {
          status = "fallback";
        } else {
          imageUrl = await runFalImage(slot.prompt);
          if (!imageUrl) {
            status = "fallback";
          }
        }
      } catch {
        status = "fallback";
      }
      payloads.push({
        title: slot.title,
        type: slot.type,
        prompt: slot.prompt,
        imageUrl,
        status,
      });
    }
  } catch {
    slots.forEach((slot) => {
      payloads.push({
        title: slot.title,
        type: slot.type,
        prompt: slot.prompt,
        imageUrl: null,
        status: "fallback",
      });
    });
  }

  const missing = payloads.filter((p) => !p.imageUrl).length;
  const source = missing === 4 ? "fallback" : "fal";

  const visuals = falPayloadsToAssets(form, brandName, payloads);

  return NextResponse.json({
    ok: true,
    source,
    visuals,
    raw: payloads,
  });
}
