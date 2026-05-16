import { NextResponse } from "next/server";
import { generateBrandBlueprint } from "@/lib/demoData";
import { defaultFormValues } from "@/lib/sample-data";
import type { BrandFormValues } from "@/lib/types";

export const runtime = "nodejs";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function parseForm(body: unknown): BrandFormValues | null {
  if (!isRecord(body)) return null;
  const required = [
    "businessIdea",
    "productServiceType",
    "targetAudience",
    "location",
    "customerProblem",
    "brandStyle",
    "visualMood",
    "language",
    "outputDepth",
  ] as const;
  for (const k of required) {
    if (typeof body[k] !== "string" || !String(body[k]).trim()) return null;
  }
  return body as unknown as BrandFormValues;
}

export async function POST(req: Request) {
  try {
    const json: unknown = await req.json();
    let form = parseForm(json);
    const sourceTag = form ? ("generated" as const) : ("fallback" as const);

    if (!form) {
      form = defaultFormValues;
    }

    const blueprint = generateBrandBlueprint(form);
    return NextResponse.json({
      ok: true,
      blueprint,
      source: sourceTag,
      note: sourceTag === "fallback" ? "Returned demo-safe blueprint due to incomplete payload." : undefined,
    });
  } catch {
    const blueprint = generateBrandBlueprint(defaultFormValues);
    return NextResponse.json({
      ok: true,
      blueprint,
      source: "fallback" as const,
      note: "Server exception — served trusted demo blueprint instead of failing.",
    });
  }
}
