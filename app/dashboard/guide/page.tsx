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
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        {guideTopics.map((topic) => (
          <li key={topic.title}>
            <article className="glass-card p-5 h-full flex flex-col">
              <h2 className="text-sm font-semibold text-white">{topic.title}</h2>
              <p className="text-xs text-zinc-500 mt-2 flex-1">{topic.description}</p>
              <button
                type="button"
                className="mt-4 self-start rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5"
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
