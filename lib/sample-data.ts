import type { BrandFormValues, BrandResult } from "./types";

export const defaultFormValues: BrandFormValues = {
  businessIdea:
    "Urban Brew Ceylon — a premium specialty coffee brand celebrating Sri Lankan heritage with modern city café culture. Single-origin beans, artisan roasting, and sustainable packaging for young professionals in Colombo.",
  productType: "F&B",
  audience: "Urban professionals aged 25–40 in Colombo & suburbs",
  brandStyle: "Premium",
  language: "Multilingual",
};

export const urbanBrewCeylon: BrandResult = {
  name: "Urban Brew Ceylon",
  tagline: "Heritage in every pour. Energy for the city.",
  mission:
    "To craft exceptional Sri Lankan coffee experiences that honor local terroir while fueling the ambition of modern urban life — ethically sourced, beautifully branded, and ready to scale.",
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
    overall: 87,
    metrics: [
      { label: "Authenticity", score: 92 },
      { label: "Consistency", score: 88 },
      { label: "Accessibility", score: 81 },
      { label: "Legal readiness", score: 85 },
      { label: "AI transparency", score: 89 },
    ],
    recommendation:
      "Strong brand coherence across visuals and copy. Add WCAG contrast checks on golden accent text and document AI-generated asset usage in your launch footer for full transparency.",
  },
  locales: [
    {
      code: "en",
      language: "English",
      headline: "Colombo's cup of heritage.",
      description:
        "Single-origin Sri Lankan coffee, roasted for the urban rhythm. Visit Urban Brew Ceylon — where tradition meets your morning momentum.",
      cta: "Order your first pour",
      hashtags: ["#UrbanBrewCeylon", "#CeylonCoffee", "#ColomboCafé"],
    },
    {
      code: "si",
      language: "Sinhala",
      headline: "උරුමයේ කෝප්පය, නගරයේ ශක්තිය.",
      description:
        "ශ්‍රී ලංකාවේ තනි මූලාශ්‍ර කෝපි — නගර ජීවන රිද්මයට ගැලපෙන ආකාරයට රෝස්ට් කළ. Urban Brew Ceylon සමඟ ඔබේ උදෑසන නැවත අර්ථවත් කරන්න.",
      cta: "ඔබේ පළමු කෝප්පය ඇණවුම් කරන්න",
      hashtags: ["#UrbanBrewCeylon", "#ලංකාකෝපි", "#කොළඹකැෆේ"],
    },
    {
      code: "ta",
      language: "Tamil",
      headline: "பாரம்பரியத்தின் கோப்பை, நகரத்தின் சக்தி.",
      description:
        "இலங்கையின் ஒற்றை மூல காபி — நகர வாழ்க்கைக்கு ஏற்ற வகையில் ரோஸ்ட் செய்யப்பட்டது. Urban Brew Ceylon உடன் உங்கள் காலையை மீண்டும் உயிர்ப்பிக்கவும்.",
      cta: "உங்கள் முதல் கோப்பை ஆர்டர் செய்யுங்கள்",
      hashtags: ["#UrbanBrewCeylon", "#இலங்கைகாபி", "#கொழும்புகஃபே"],
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
        "Placeholder slots show where Fal-generated logos, heroes, and social assets will appear once APIs are connected.",
    },
    {
      title: "Spin the 3D Brand Reality",
      description:
        "Use the CSS preview to sense packaging and cup presence before investing in full 3D renders.",
    },
    {
      title: "Check your AI Trust Score",
      description:
        "Scores reflect authenticity, consistency, accessibility, legal readiness, and AI transparency — aim for 85+ before launch.",
    },
    {
      title: "Ship the Multilingual Launch Kit",
      description:
        "Copy EN, Sinhala, and Tamil snippets directly into ads, app store listings, and social bios.",
    },
    {
      title: "Export & iterate",
      description:
        "Return to Create to refine your idea. In production, Veridia will regenerate visuals and scores on each pass.",
    },
  ],
};
