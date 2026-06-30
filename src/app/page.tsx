"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { CategoryTabs } from "@/components/CategoryTabs";
import { CoursePreviewCards } from "@/components/CoursePreviewCards";
import { ProductCard } from "@/components/ProductCard";
import { CartPanel } from "@/components/Cart";
import { products, shop } from "@/data/products";
import { brand } from "@/data/brand";
import {
  addLine,
  cartCount,
  cartTotals,
  removeLine,
  type CartLine,
} from "@/lib/cart";
import { cn } from "@/lib/utils";

export default function ShopPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [checkoutMsg, setCheckoutMsg] = useState("");
  const [payMethod, setPayMethod] = useState<"card" | "mpesa">("card");
  const [category, setCategory] = useState("all");
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const mobileCartRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { digital: 0, course: 0, merch: 0, consulting: 0 };
    for (const p of products) c[p.category]++;
    return c;
  }, []);

  const filtered = useMemo(
    () => (category === "all" ? products : products.filter((p) => p.category === category)),
    [category]
  );

  const { usd, kes } = cartTotals(lines);
  const count = cartCount(lines);

  const addToCart = useCallback((product: (typeof products)[0]) => {
    setLines((l) => addLine(l, product));
    setCheckoutMsg("");
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setLines((l) => removeLine(l, id));
  }, []);

  const handleCheckout = async () => {
    if (!lines.length) return;
    setCheckingOut(true);
    try {
      const items = lines.flatMap((l) => Array.from({ length: l.qty }, () => l.product));
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, method: payMethod }),
      });
      const data = await res.json();
      setCheckoutMsg(data.message ?? "Checkout initiated.");
    } finally {
      setCheckingOut(false);
    }
  };

  const scrollToCart = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      document.getElementById("cart-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setMobileCartOpen(true);
    }
  };

  const selectModule = useCallback((id: string) => {
    setCategory("course");
    setHighlightedId(id);
    requestAnimationFrame(() => {
      document.getElementById(`product-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    setTimeout(() => setHighlightedId(null), 2000);
  }, []);

  useEffect(() => {
    if (!mobileCartOpen) return;
    const root = mobileCartRef.current;
    if (!root) return;

    const getFocusables = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

    const focusables = getFocusables();
    focusables[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileCartOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = getFocusables();
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileCartOpen]);

  return (
    <div className="min-h-screen pb-24 lg:pb-0">
      <Header cartCount={count} onCartClick={scrollToCart} />

      <section className="border-b border-white/10 bg-gradient-to-r from-lab-accent/10 to-lab-green/10 px-6 py-10 md:py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-lg">
            <Image
              src="/assets/brand/Georgie the Educator Logo.png"
              alt="Georgie the Educator — GK Lab"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <p className="text-sm font-medium text-lab-accent">{brand.persona}</p>
            <h1 className="mt-1 text-2xl font-bold text-white md:text-3xl">{brand.tagline}</h1>
            <p className="mt-2 text-sm text-white/50 md:text-base">{brand.subtagline}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
              {brand.heroBlurb} Watch free on{" "}
              <a
                href={shop.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-lab-accent underline decoration-lab-accent/40 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
              >
                YouTube
              </a>
              ; grab the full bundle here.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_340px] lg:py-12">
        <main>
          <div className="sticky top-[65px] z-20 -mx-6 border-b border-white/5 bg-lab-dark/95 px-6 py-3 backdrop-blur-md">
            <CategoryTabs active={category} onChange={setCategory} counts={counts} />
          </div>

          {(category === "course" || category === "all") && (
            <CoursePreviewCards
              onSelectModule={selectModule}
              activeModuleId={highlightedId}
            />
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
                justAdded={addedId === product.id}
                highlighted={highlightedId === product.id}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-8 text-center text-sm text-white/40">No products in this category.</p>
          )}
        </main>

        <aside
          id="cart-panel"
          className="hidden h-fit rounded-xl border border-white/10 bg-white/5 p-6 lg:sticky lg:top-20 lg:block"
        >
          <CartPanel
            lines={lines}
            usd={usd}
            kes={kes}
            payMethod={payMethod}
            onPayMethod={setPayMethod}
            onRemove={removeFromCart}
            onCheckout={handleCheckout}
            checkoutMsg={checkoutMsg}
            checkingOut={checkingOut}
          />
        </aside>
      </div>

      {/* Mobile cart bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-lab-dark/95 p-4 backdrop-blur-md lg:hidden">
        <button
          type="button"
          onClick={() => setMobileCartOpen(true)}
          className={cn(
            "flex w-full min-h-[48px] items-center justify-between rounded-xl px-4 py-3 transition active:scale-[0.99]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lab-accent",
            count > 0
              ? "bg-lab-accent text-lab-dark"
              : "border border-white/10 bg-white/5 text-white/70 hover:border-lab-accent/40 hover:text-white"
          )}
        >
          <span className="font-semibold">
            {count > 0 ? `View cart (${count})` : "Cart"}
          </span>
          {count > 0 && (
            <span className="font-mono text-sm">
              {usd > 0 && `$${usd}`}
              {usd > 0 && kes > 0 && " + "}
              {kes > 0 && `KES ${kes.toLocaleString()}`}
            </span>
          )}
        </button>
      </div>

      {/* Mobile cart drawer */}
      {mobileCartOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Shopping cart">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileCartOpen(false)}
            aria-label="Close cart overlay"
          />
          <div
            ref={mobileCartRef}
            className="absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-white/10 bg-lab-dark p-6 shadow-2xl transition-transform duration-200"
          >
            <CartPanel
              lines={lines}
              usd={usd}
              kes={kes}
              payMethod={payMethod}
              onPayMethod={setPayMethod}
              onRemove={removeFromCart}
              onCheckout={handleCheckout}
              checkoutMsg={checkoutMsg}
              checkingOut={checkingOut}
              mobile
              onClose={() => setMobileCartOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
