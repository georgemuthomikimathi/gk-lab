"use client";

import { useState } from "react";
import Image from "next/image";
import { CreditCard, ShoppingCart, Smartphone, Trash2, Zap } from "lucide-react";
import { products, shop, type Product } from "@/data/products";

function formatPrice(p: Product) {
  if (p.currency === "KES") return `KES ${p.price.toLocaleString()}`;
  return `$${p.price}`;
}

export default function ShopPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [checkoutMsg, setCheckoutMsg] = useState("");
  const [payMethod, setPayMethod] = useState<"card" | "mpesa">("card");

  const addToCart = (product: Product) => {
    setCart((c) => [...c, product]);
    setCheckoutMsg("");
  };

  const removeFromCart = (id: string) => setCart((c) => c.filter((p) => p.id !== id));

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  const handleCheckout = async () => {
    if (!cart.length) return;
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, method: payMethod }),
    });
    const data = await res.json();
    setCheckoutMsg(data.message ?? "Checkout initiated.");
  };

  const categories = ["digital", "course", "merch", "consulting"] as const;

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-2xl font-bold text-white">{shop.name}</p>
            <p className="text-sm text-white/50">{shop.tagline}</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <a href={shop.portfolioUrl} className="hover:text-white">Portfolio</a>
            <a href={shop.vibeUrl} className="hover:text-white">GK WOO</a>
            <span className="flex items-center gap-1 text-lab-accent">
              <ShoppingCart className="h-4 w-4" /> {cart.length}
            </span>
          </div>
        </div>
      </header>

      <section className="border-b border-white/10 bg-gradient-to-r from-lab-accent/10 to-lab-green/10 px-6 py-12">
        <div className="mx-auto flex max-w-6xl items-center gap-8">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10">
            <Image src="/assets/brand/IMTAT Logo Slide.png" alt="GK Lab" fill className="object-cover" unoptimized />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Engineer · Trader · Educator</h1>
            <p className="mt-2 text-white/60">MQL5 templates, IMTAT courses, GK merch, and 1-on-1 consulting.</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_340px]">
        <div>
          {categories.map((cat) => {
            const items = products.filter((p) => p.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat} className="mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-lab-accent">{cat}</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {items.map((product) => (
                    <div key={product.id} className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-lab-accent/40">
                      {product.badge && (
                        <span className="text-xs font-medium uppercase tracking-wider text-lab-gold">{product.badge}</span>
                      )}
                      <p className="mt-2 font-semibold text-white">{product.name}</p>
                      <p className="mt-2 text-sm text-white/50">{product.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-mono text-lab-green">{formatPrice(product)}</span>
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="rounded-lg bg-lab-accent px-4 py-2 text-sm font-medium text-lab-dark hover:bg-lab-accent/90"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <aside className="h-fit rounded-xl border border-white/10 bg-white/5 p-6 lg:sticky lg:top-6">
          <h3 className="flex items-center gap-2 font-semibold text-white">
            <ShoppingCart className="h-4 w-4" /> Cart
          </h3>
          {cart.length === 0 ? (
            <p className="mt-4 text-sm text-white/40">Empty — add something fire.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {cart.map((item, i) => (
                <li key={`${item.id}-${i}`} className="flex items-start justify-between text-sm">
                  <span className="text-white/80">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lab-green">{formatPrice(item)}</span>
                    <button type="button" onClick={() => removeFromCart(item.id)} className="text-white/30 hover:text-red-400">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 border-t border-white/10 pt-4">
            <p className="flex justify-between text-sm">
              <span className="text-white/50">Total</span>
              <span className="font-mono font-semibold text-white">${total}</span>
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setPayMethod("card")}
              className={`flex flex-1 items-center justify-center gap-1 rounded-lg border py-2 text-xs ${payMethod === "card" ? "border-lab-accent bg-lab-accent/10 text-lab-accent" : "border-white/10 text-white/50"}`}
            >
              <CreditCard className="h-3.5 w-3.5" /> Card
            </button>
            <button
              type="button"
              onClick={() => setPayMethod("mpesa")}
              className={`flex flex-1 items-center justify-center gap-1 rounded-lg border py-2 text-xs ${payMethod === "mpesa" ? "border-lab-green bg-lab-green/10 text-lab-green" : "border-white/10 text-white/50"}`}
            >
              <Smartphone className="h-3.5 w-3.5" /> M-Pesa
            </button>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={!cart.length}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-lab-green py-3 text-sm font-semibold text-lab-dark disabled:opacity-40"
          >
            <Zap className="h-4 w-4" /> Checkout
          </button>

          {checkoutMsg && <p className="mt-3 text-xs text-lab-accent">{checkoutMsg}</p>}
          <p className="mt-4 text-[10px] text-white/30">{shop.stripe.note}. {shop.mpesa.note}</p>
        </aside>
      </div>
    </div>
  );
}
