import { DEFAULT_TRUST_SUGGESTIONS, buildTrustMetrics } from "@/lib/trustScore";
import type { BrandFormValues, BrandResult } from "./types";

export const defaultFormValues: BrandFormValues = {
  businessIdea:
    "Urban Brew Ceylon — premium specialty coffee celebrating Sri Lankan heritage with modern city café culture. Single-origin beans, artisan roasting, and sustainable packaging.",
  productServiceType: "Food & Beverage",
  targetAudience: "Urban professionals aged 25–40 in Colombo & suburbs",
  location: "Colombo, Sri Lanka · regional SEA rollout",
  customerProblem:
    "Morning routines feel rushed; founders want ethically sourced café-grade coffee without long queues or opaque supply chains.",
  brandStyle: "Premium",
  visualMood: "Warm",
  language: "English",
  outputDepth: "Balanced",
};

export const urbanBrewCeylon: BrandResult = {
  name: "Urban Brew Ceylon",
  tagline: "Heritage in every pour. Energy for the city.",
  mission:
    "To craft exceptional Sri Lankan coffee experiences that honor local terroir while fueling the ambition of modern urban life — ethically sourced, beautifully branded, and ready to scale.",
  productTag: "Balanced · Warm",
  colors: [
    { name: "Ceylon Emerald", hex: "#0D4F3C" },
    { name: "Roast Umber", hex: "#4A2C2A" },
    { name: "Golden Crema", hex: "#D4A574" },
    { name: "Urban Slate", hex: "#1A1A2E" },
    { name: "Mist White", hex: "#F5F0EB" },
  ],
  typography: {
    heading: "Playfair Display",
    body: "DM Sans",
  },
  voiceTone: [
    "Warm yet sophisticated — like a barista who knows your order",
    "Proudly local without feeling provincial",
    "Confident, concise, and sensory-rich in descriptions",
    "Transparent about sourcing and sustainability",
  ],
  visuals: [
    {
      id: "logo",
      label: "Logo Mark",
      gradient: "from-emerald-600 via-teal-500 to-amber-600",
      caption: "Generated with Fal — demo",
    },
    {
      id: "hero",
      label: "Hero Banner",
      gradient: "from-slate-900 via-emerald-900 to-amber-900",
      caption: "Generated with Fal — demo",
    },
    {
      id: "product",
      label: "Product Shot",
      gradient: "from-amber-800 via-rose-900 to-emerald-800",
      caption: "Generated with Fal — demo",
    },
    {
      id: "social",
      label: "Social Post",
      gradient: "from-violet-700 via-emerald-700 to-amber-600",
      caption: "Generated with Fal — demo",
    },
    {
      id: "packaging",
      label: "Packaging",
      gradient: "from-emerald-800 via-stone-800 to-amber-700",
      caption: "Generated with Fal — demo",
    },
    {
      id: "storefront",
      label: "Storefront Mockup",
      gradient: "from-indigo-900 via-emerald-900 to-slate-800",
      caption: "Generated with Fal — demo",
    },
  ],
  trustScore: {
    overall: 78,
    metrics: buildTrustMetrics(78),
    suggestions: DEFAULT_TRUST_SUGGESTIONS.map((s) => ({ title: s.title, description: s.description })),
    recommendation:
      "Strong cohesion — add FAQs + refund wording to sprint past mid-80s ahead of fundraising conversations.",
  },
  locales: [
    {
      code: "en",
      language: "English",
      headline: "Colombo's cup of heritage.",
      websiteHeadline: "Single-origin pours built for Colombo’s hustle.",
      socialCaption:
        "Heritage roasting · modern hustle. Sip Urban Brew Ceylon ☕✨ #UrbanBrewCeylon #CeylonCoffee",
      whatsappMessage:
        "Hey! Grab Urban Brew Ceylon pouches tomorrow — ethically sourced Sri Lankan coffee with next-day Colombo drops.",
      shortAdCopy: "One idea. One tray. Colombo’s brightest cup.",
      description:
        "Single-origin Sri Lankan coffee, roasted for the urban rhythm. Visit Urban Brew Ceylon — where tradition meets your morning momentum.",
      founderPitch:
        "I started Urban Brew Ceylon to prove island-grown coffee can glow on global café menus without losing farmer transparency.",
      cta: "Order your first pour",
      hashtags: ["#UrbanBrewCeylon", "#CeylonCoffee", "#ColomboCafé"],
    },
    {
      code: "si",
      language: "Sinhala",
      headline: "උරුමයේ කෝප්පය, නගරයේ ශක්තිය.",
      websiteHeadline: "කොළඹ රාත්‍රී ගමනට නැවුම් සුවඳැති විශ්වාසය.",
      socialCaption:
        "Urban Brew Ceylon දැන් ඔබේ feed එකේ — උපුටා ගත් උපන් භූමිය #UrbanBrewCeylon #ලංකාකෝපි",
      whatsappMessage:
        "ආයුබෝවන්! Urban Brew Ceylon වල අලුත් drop එක grab කරගන්න — කොළඹ හුදෙක් එදිරි දින delivery.",
      shortAdCopy: "එක idea එක brand reality!",
      description:
        "ශ්‍රී ලංකාවේ තනි මූලාශ්‍ර කෝපි — නගර ජීවන රිද්මයට ගැලපෙන ආකාරයට රෝස්ට් කළ. Urban Brew Ceylon සමඟ ඔබේ උදෑසන නැවත අර්ථවත් කරන්න.",
      founderPitch: "පුද්ගලයින්ට විශ්වාස විකල්ප ලබා දීමට මම මෙය ආරම්භ කළෙමි — ගොවීන්ගේ සැබෑ නාම කථනත්වය ගලන්නාවූ.",
      cta: "ඔබේ පළමු කෝප්පය ඇණවුම් කරන්න",
      hashtags: ["#UrbanBrewCeylon", "#ලංකාකෝපි", "#කොළඹකැෆේ"],
    },
    {
      code: "tg",
      language: "Tamil Tanglish",
      headline: "Colombo vibes + heritage brew romba strong ☕🔥",
      websiteHeadline: "Urban Brew Ceylon — city pace ku perfect filter coffee moment.",
      socialCaption:
        "Seri neram seri aroma! Urban Brew Ceylon swipe pannunga — sustainably sourced hype #tanglishcoffee",
      whatsappMessage:
        "Machan! Tomorrow Urban Brew tasting pod — Colombo drop ready. Sip ready ah?",
      shortAdCopy: "Ore idea, ore glossy brand tray.",
      description:
        "Single-origin Lanka beans, artisan roast pani modern cafe culture ku match aagum.",
      founderPitch:
        "Na Urban Brew ah start pannen because Colombo founders ku premium honest coffee vending moment venum.",
      cta: "Ippo order pannunga",
      hashtags: ["#UrbanBrewCeylon", "#tanglishbrand", "#ColomboCoffee"],
    },
  ],
  userGuide: [
    {
      title: "Welcome to your brand kit",
      description:
        "Review Brand Identity first — colors, fonts, and voice set the foundation for every touchpoint.",
    },
    {
      title: "Explore Fal Visual Lab",
      description:
        "Placeholder slots glow until Fal swaps in final renders — regenerate anytime once keys unlock.",
    },
    {
      title: "Spin the 3D Brand Reality",
      description:
        "CSS-powered booths frame your launch story — perfect for teaser reels.",
    },
    {
      title: "Check your AI Trust Score",
      description:
        "Dial in founders’ proof loops to push credibility past mid-80s before launch interviews.",
    },
    {
      title: "Ship the Multilingual Launch Kit",
      description:
        "Copy EN · සිංහල · Tanglish scripts directly into TikTok captions, storefront QR flows, WhatsApp broadcasts.",
    },
    {
      title: "Export & iterate",
      description:
        "Use Export & Share to demo ZIP/Markdown while Supabase syncing warms.",
    },
  ],
};
