"use client";

import { ShoppingCart } from "lucide-react";
import { shop } from "@/data/products";
import { brand } from "@/data/brand";
import { cn } from "@/lib/utils";

type Props = {
  cartCount: number;
  onCartClick: () => void;
};

export function Header({ cartCount, onCartClick }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-lab-dark/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="min-w-0">
          <p className="truncate text-xl font-bold text-white md:text-2xl">{shop.name}</p>
          <p className="hidden text-sm text-white/50 sm:block">{shop.tagline}</p>
        </div>

        <nav className="flex items-center gap-2 text-sm text-white/60 md:gap-4" aria-label="Site">
          <a
            href={shop.portfolioUrl}
            className="hidden rounded-md px-2 py-2 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lab-accent sm:inline"
          >
            Portfolio
          </a>
          <a
            href={shop.vibeUrl}
            className="hidden rounded-md px-2 py-2 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lab-accent md:inline"
          >
            GK WOO
          </a>
          <a
            href={shop.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md px-2 py-2 text-lab-accent transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lab-accent lg:inline"
          >
            {brand.persona}
          </a>
          <button
            type="button"
            onClick={onCartClick}
            className={cn(
              "relative flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-lg border border-white/10 px-3 transition-colors",
              "hover:border-lab-accent/50 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lab-accent"
            )}
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingCart className="h-4 w-4 text-lab-accent" />
            <span className="font-mono text-sm text-white">{cartCount}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
