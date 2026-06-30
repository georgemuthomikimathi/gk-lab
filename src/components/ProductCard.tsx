"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/cart";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  onAdd: (p: Product) => void;
  justAdded?: boolean;
  highlighted?: boolean;
};

export function ProductCard({ product, onAdd, justAdded, highlighted }: Props) {
  const [expanded, setExpanded] = useState(false);
  const isCourse = product.category === "course";

  return (
    <article
      id={`product-${product.id}`}
      className={cn(
        "group scroll-mt-36 rounded-xl border border-white/10 bg-white/5 transition-all duration-200",
        "hover:border-lab-accent/40 hover:bg-white/[0.07]",
        "focus-within:border-lab-accent/40",
        highlighted && "border-lab-accent/60 ring-1 ring-lab-accent/30"
      )}
    >
      {product.image && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl border-b border-white/10 bg-lab-dark">
          <Image
            src={product.image}
            alt=""
            fill
            className="object-cover opacity-80 transition-opacity duration-200 group-hover:opacity-100"
            unoptimized
          />
          {product.moduleNumber && (
            <span className="absolute left-3 top-3 rounded-md bg-lab-dark/80 px-2 py-1 font-mono text-xs text-lab-accent backdrop-blur-sm">
              M{String(product.moduleNumber).padStart(2, "0")}
            </span>
          )}
        </div>
      )}

      <div className="p-5">
        {product.badge && (
          <span className="text-xs font-medium uppercase tracking-wider text-lab-gold">{product.badge}</span>
        )}
        <h3 className="mt-2 font-semibold leading-snug text-white">{product.name}</h3>
        <p className={cn("mt-2 text-sm text-white/50", !expanded && isCourse && "line-clamp-2")}>
          {product.description}
        </p>

        {isCourse && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-2 flex items-center gap-1 text-xs text-lab-accent transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lab-accent"
            aria-expanded={expanded}
          >
            {expanded ? "Less detail" : "Preview module"}
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", expanded && "rotate-180")} />
          </button>
        )}

        {expanded && isCourse && (
          <ul className="mt-3 space-y-1 border-t border-white/10 pt-3 text-xs text-white/40">
            <li>Intro + lesson + outro scripts</li>
            <li>ElevenLabs-ready narration exports</li>
            <li>Handbook draft included</li>
          </ul>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-mono text-lab-green">{formatPrice(product)}</span>
          <button
            type="button"
            onClick={() => onAdd(product)}
            className={cn(
              "flex min-h-[44px] min-w-[88px] items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lab-accent",
              justAdded
                ? "bg-lab-green text-lab-dark"
                : "bg-lab-accent text-lab-dark hover:bg-lab-accent/90 active:scale-[0.98]"
            )}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-4 w-4" />
            {justAdded ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
