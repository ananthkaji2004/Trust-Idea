import { Suspense } from "react";

import { BrandForm } from "@/components/create/BrandForm";

function FormFallback() {
  return <div className="glass-card mx-auto mt-8 h-[520px] w-full max-w-5xl animate-pulse" aria-hidden />;
}

export default function CreatePage() {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <p className="trust-kicker">Create</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white md:text-4xl">
          Prime your briefing
        </h1>
        <p className="trust-copy mt-4">
          Every selector shapes Fal prompts, multilingual tone, heuristic Trust Score pacing, and Supabase payloads —
          gracefully degrading offline for hackathon booths.
        </p>
      </div>

      <Suspense fallback={<FormFallback />}>
        <BrandForm />
      </Suspense>
    </section>
  );
}
