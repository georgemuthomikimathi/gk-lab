"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { imtatModules } from "@/data/imtat";
import { brand } from "@/data/brand";
import { cn } from "@/lib/utils";

type Props = {
  onSelectModule: (id: string) => void;
  activeModuleId?: string | null;
};

export function CoursePreviewCards({ onSelectModule, activeModuleId }: Props) {
  return (
    <section aria-label="IMTAT course modules" className="mt-6">
      <div className="flex items-center gap-4 rounded-xl border border-lab-accent/20 bg-lab-accent/5 p-4 md:p-5">
        <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10">
          <Image
            src="/assets/brand/IMTAT Course Title Slide.png"
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-snug text-white">
            {brand.imtat.shortName} — {brand.imtat.moduleCount} modules
          </p>
          <p className="mt-1 text-xs text-white/50">{brand.subtagline}</p>
        </div>
      </div>

      <div
        role="list"
        className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory"
      >
        {imtatModules.map((mod) => (
          <button
            key={mod.id}
            type="button"
            role="listitem"
            onClick={() => onSelectModule(mod.id)}
            className={cn(
              "group snap-start shrink-0 w-[200px] rounded-xl border p-4 text-left transition-all duration-200",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lab-accent",
              activeModuleId === mod.id
                ? "border-lab-accent bg-lab-accent/10"
                : "border-white/10 bg-white/5 hover:border-lab-accent/40 hover:bg-white/[0.07]"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-lab-accent">
                M{String(mod.number).padStart(2, "0")}
              </span>
              {mod.badge && (
                <span className="rounded bg-lab-gold/20 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-lab-gold">
                  {mod.badge}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm font-medium leading-snug text-white">{mod.title}</p>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/45">
              {mod.summary}
            </p>
            <span className="mt-3 flex items-center gap-1 text-[10px] text-lab-accent/70 transition-colors group-hover:text-lab-accent">
              <Play className="h-3 w-3" aria-hidden />
              Preview module
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
