import type { BrandFormValues, LanguageOption, LocaleContent } from "@/lib/types";

function excerpt(s: string, max = 80) {
  const t = s.trim().replace(/\s+/g, " ");
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

type BrandNameCtx = { brandName: string; tagline: string; ideaLite: string; audienceLite: string };

/** Roman Tamil/Tanglish style — readable mixed Roman script */
function tanglishWebsiteHeadline(brandName: string) {
  return `${brandName} — idea unna real brand-a maathidum 😎🔥`;
}

export function buildLocaleBundle(ctx: BrandNameCtx, primary: LanguageOption): LocaleContent[] {
  const baseEn: LocaleContent = {
    code: "en",
    language: "English",
    headline: `${ctx.brandName} — ${ctx.tagline}`,
    websiteHeadline: `${ctx.brandName} launches ${ctx.ideaLite}`,
    socialCaption: `Meet ${ctx.brandName}: ${ctx.tagline}. Built for ${ctx.audienceLite}. #trustidea #startup`,
    whatsappMessage: `Hi! ${ctx.brandName} solves a real headache for ${ctx.audienceLite}. Want early access?`,
    shortAdCopy: `${ctx.brandName} — fast, credible, founder-built. Tap in.`,
    description: excerpt(ctx.ideaLite, 520),
    founderPitch: `I’m building ${ctx.brandName} because ${ctx.ideaLite}`,
    cta: "Start now",
    hashtags: [`#${ctx.brandName.replace(/\s+/g, "")}`, "#TrustBrand", "#LaunchReady"],
  };

  const si: LocaleContent = {
    code: "si",
    language: "Sinhala",
    headline: `${ctx.brandName} — විශ්වාසණීය විසඳුමක්`,
    websiteHeadline: `${ctx.audienceLite} සඳහා ${ctx.brandName} නිසා වේගවත් විශ්වාසදායී පිවිසුමක්`,
    socialCaption: `${ctx.brandName} — ${ctx.tagline}. නව සම්බන්ධතාවක් #trustidea`,
    whatsappMessage: `ආයුබෝවන්! ${ctx.brandName} සමඟ ${ctx.audienceLite} වලට ගැලපෙන විසඳුම.`,
    shortAdCopy: `${ctx.brandName} — සරල වේගවත් විශ්වාස.`,
    description: excerpt(ctx.ideaLite, 520),
    founderPitch: `මම ${ctx.brandName} හදන්නේ ${ctx.ideaLite}`,
    cta: "දැන් ආරම්භ කරන්න",
    hashtags: ["#ශ්‍රීලංකාව", "#බ්‍රෑන්ඩි", `#${ctx.brandName.replace(/\s+/g, "")}`],
  };

  const tanglish: LocaleContent = {
    code: "tg",
    language: "Tamil Tanglish",
    headline: tanglishWebsiteHeadline(ctx.brandName),
    websiteHeadline: `${ctx.brandName}: ${ctx.ideaLite} — startup life easy pannidurom`,
    socialCaption: `Hey friends! ${ctx.brandName} — ${ctx.tagline}. Audience: ${ctx.audienceLite}. #oruidea #brandreality`,
    whatsappMessage: `Hi hi! ${ctx.brandName} pathi pesalam — ${ctx.audienceLite} ku perfect fit.`,
    shortAdCopy: `${ctx.brandName} vera level trusted brand vibes 🚀`,
    description: excerpt(ctx.ideaLite, 520),
    founderPitch: `Naan ${ctx.brandName} build pannuven because ${ctx.ideaLite}`,
    cta: "Ippo start pannunga",
    hashtags: [`#${ctx.brandName.replace(/\s+/g, "")}`, "#tanglishlaunch", "#trustidea"],
  };

  /** Order primary language first when possible */
  const all = [baseEn, si, tanglish];
  const order =
    primary === "Sinhala"
      ? [si, baseEn, tanglish]
      : primary === "Tamil Tanglish"
        ? [tanglish, baseEn, si]
        : [baseEn, si, tanglish];

  const seen = new Set<string>();
  const out: LocaleContent[] = [];
  for (const l of order) {
    if (seen.has(l.code)) continue;
    seen.add(l.code);
    out.push(l);
  }
  for (const l of all) if (!seen.has(l.code)) out.push(l);
  return out;
}

export function slugifyBrand(seed: string) {
  return (
    seed
      .replace(/[^\w\s-]/g, "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 4)
      .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ") || "Trusted Launch"
  );
}
