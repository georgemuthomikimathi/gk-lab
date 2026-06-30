"use client";

import { cn } from "@/lib/utils";

const labels: Record<string, string> = {
  all: "All",
  digital: "Digital",
  course: "Courses",
  merch: "Merch",
  consulting: "Consulting",
};

type Props = {
  active: string;
  onChange: (cat: string) => void;
  counts: Record<string, number>;
};

export function CategoryTabs({ active, onChange, counts }: Props) {
  const tabs = ["all", "digital", "course", "merch", "consulting"] as const;

  return (
    <div
      role="tablist"
      aria-label="Product categories"
      className="flex gap-1 overflow-x-auto pb-1 scrollbar-none"
    >
      {tabs.map((cat) => {
        const count = cat === "all" ? Object.values(counts).reduce((a, b) => a + b, 0) : counts[cat] ?? 0;
        if (cat !== "all" && count === 0) return null;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            onClick={() => onChange(cat)}
            className={cn(
              "shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lab-accent",
              active === cat
                ? "bg-lab-accent text-lab-dark"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            {labels[cat]}
            <span className="ml-1.5 text-xs opacity-70">({count})</span>
          </button>
        );
      })}
    </div>
  );
}
