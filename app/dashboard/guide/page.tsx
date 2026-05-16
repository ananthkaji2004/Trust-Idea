import Link from "next/link";
import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";

const guideTopics = [
  { title: "Getting started", description: "Create your first brand from an idea." },
  { title: "Language Kit", description: "Localize copy and assets for global launch." },
  { title: "AI Trust Score", description: "Understand and improve brand credibility." },
  { title: "Export & Share", description: "Download kits and share with your team." },
];

export default function GuidePage() {
  return (
    <>
      <DashboardSectionHeader
        title="Guidance"
        description="Tips and walkthroughs for every step of your brand journey."
      />
      <ul className="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        {guideTopics.map((topic) => (
          <li key={topic.title}>
            <article className="glass-card trust-card-hover flex h-full min-h-[180px] flex-col p-5">
              <h2 className="text-sm font-semibold text-zinc-950 dark:text-white">{topic.title}</h2>
              <p className="trust-copy mt-2 flex-1 text-xs">{topic.description}</p>
              <button
                type="button"
                className="trust-button-secondary mt-5 self-start text-xs"
              >
                Read more
              </button>
            </article>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-zinc-500">
        Need the full platform overview?{" "}
        <Link href="/#guide" className="text-violet-400 hover:text-violet-300">
          Visit the public guide
        </Link>
        .
      </p>
    </>
  );
}
